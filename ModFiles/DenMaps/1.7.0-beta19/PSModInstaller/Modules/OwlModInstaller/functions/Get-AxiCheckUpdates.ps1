function Get-AxiCheckUpdates {
    [cmdletbinding()]
    param(
        [Parameter(mandatory)]
        [string]$Repository,

        [Parameter(mandatory)]
        $CurrentVersion,

        [Parameter(mandatory)]
        [array]$ExcludedVersions,

        [Parameter(mandatory)]
        [string]$DenMapsFolderPath,

        [Parameter()]
        [string]$PrivateBetaKey
    )

    $CurrentVersion = Get-AxiSemVer -Version $CurrentVersion

    $Headers = @{
        "User-Agent" = "OwlModInstaller"
    }
    if ($PrivateBetaKey) {
        $Headers.Add("Authorization", "token $PrivateBetaKey")
    }
    # Object with version, download url, and other info

    try {
        $Response = Invoke-RestMethod -Uri "https://api.github.com/repos/$Repository/releases" -Method Get -Headers $Headers
    }
    catch {
        throw $_
    }
    $Versions = $Response | ForEach-Object {
        $semVer = $null
        try {
            $semVer = Get-AxiSemVer -Version $_.tag_name
        }
        catch {
            Write-Output $_
        }

        if ($null -ne $semVer) {
            [PSCustomObject]@{
                VersionName = $_.tag_name
                SemVer      = $semVer
                DownloadURL = $_.assets[0].url
            }
        }
    } | Where-Object {
        $_.VersionName -notin $ExcludedVersions -and ($CurrentVersion -in $ExcludedVersions -or $CurrentVersion -lt $_.SemVer)
    } | Sort-Object -Property SemVer -Descending

    if ($null -eq $Versions) {
        return $null
    }
    else {
        return $Versions[0]
    }
}
