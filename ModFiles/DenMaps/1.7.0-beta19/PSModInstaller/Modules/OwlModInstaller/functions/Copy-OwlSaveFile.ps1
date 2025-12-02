function Copy-OwlSaveFile {
    [cmdletbinding()]
    param(
        [Parameter(mandatory)]
        [Alias('SteamID', 'ID')]
        [string]$SteamID64,

        [Parameter(mandatory)]
        [Alias('NewExt')]
        [string]$DestinationExtension,

        [Alias('OldExt', 'SourceExt')]
        [string]$SourceExtension = "sl2",

        [Alias("OldExtensions")]
        [string[]]$SourceExtensions = @($SourceExtension),

        [Alias('ExcludedSaves')]
        [string[]]$ExcludedSaveExtensions = @(),

        [string]$GameFolderName = "EldenRing",
        [string]$SaveFileName = "ER0000",
        [string]$DestinationSaveFileName = $SaveFileName,
        [string]$SavesFolder = (Join-Path $env:APPDATA -ChildPath $GameFolderName | Join-Path -ChildPath $SteamID64),
        [int]$SaveFileVersion = ($DestinationExtension -replace '\D+', '')
    )

    process {
        $ExtensionPatterns = $SourceExtensions | ForEach-Object { ".*$_" }
        $ExcludedExtensionsPatterns = $ExcludedSaveExtensions | ForEach-Object { ".$_" }

        $saveFiles = Get-ChildItem -Path (Join-Path $SavesFolder -ChildPath "*") -Filter "$SaveFileName.*" -File |
        Where-Object {
            $extensionMatch = $false
            foreach ($pattern in $ExtensionPatterns) {
                if ($_.Extension -match $pattern) {
                    $extensionMatch = $true
                    break
                }
            }
            $ExcludedExtensionsPatterns -notcontains $_.Extension -and $extensionMatch
        } |
        ForEach-Object {
            $version = [int]($_.Name -replace '\D+', '')
            $_ |
            Add-Member -NotePropertyName 'Version' -NotePropertyValue $version -PassThru
        } |
        Where-Object { $_.Version -lt $SaveFileVersion } |
        Sort-Object Version -Descending

        $latestSaveFile = $saveFiles | Select-Object -First 1

        if ($null -eq $latestSaveFile) {
            throw "Could not find any save files at $SavesFolder"
        }

        $DestinationSaveFilePath = Join-Path $SavesFolder -ChildPath "$DestinationSaveFileName.$DestinationExtension"

        Write-Verbose "Copying $($latestSaveFile.FullName)"
        Copy-Item $latestSaveFile.FullName -Destination $DestinationSaveFilePath
    }
}
