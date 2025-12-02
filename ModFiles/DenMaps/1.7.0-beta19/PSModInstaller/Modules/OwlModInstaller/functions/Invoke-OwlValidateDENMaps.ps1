function Invoke-OwlValidateDENMaps {
    [cmdletbinding()]
    param(
        [Parameter(mandatory)]
        $Settings,

        [Parameter()]
        [string]$ScriptDir = $MyInvocation.PSScriptRoot
    )

    $DenMapsFolderPath = Get-OwlFullPath -Base $ScriptDir -Path $Settings.PATHS.DenMapsFolderPath
    function DenMapsValid {
        Test-OwlAreFilesValid `
            -ValidationJsonPath (Get-OwlFullPath -Base $DenMapsFolderPath -Path $Settings.DENMAPS.ValidationJsonPath) `
            -PathPlaceholders @{
                "{{DENMAPS}}" = $DenMapsFolderPath.TrimEnd("/", "\")
            }
    }

    if (!(DenMapsValid)) {
        Write-OwlError "DEN Maps Files are invalid, please reinstall"
        Read-Host -Prompt "Press Enter to exit"
        exit 1
    }
    else {
        Write-Host "Confirmed DEN Maps Installed" -ForegroundColor "green"
    }
}