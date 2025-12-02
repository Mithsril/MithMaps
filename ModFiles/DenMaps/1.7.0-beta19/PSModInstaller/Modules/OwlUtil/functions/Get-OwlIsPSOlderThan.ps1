function Get-OwlIsPSOlderThan {
    [CmdletBinding()]
    param(
        [System.Version]$Version
    )

    process {
        Write-Output ((Get-OwlPSVersion) -lt $Version)
    }
}