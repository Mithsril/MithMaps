function Invoke-OwlInstallModEngine {
    [cmdletbinding()]
    param(
        [Parameter(mandatory)]
        $Settings,

        [Parameter()]
        [string]$ScriptDir = $MyInvocation.PSScriptRoot
    )

    $ModEngineFolderPath = Get-OwlFullPath -Base $ScriptDir -Path $Settings.PATHS.ModEngineFolderPath
    function ModEngineValid {
        Test-OwlAreFilesValid `
            -ValidationJsonPath (Get-OwlFullPath -Base $ScriptDir -Path $Settings.MODENGINE.ValidationJsonPath) `
            -PathPlaceholders @{
                "{{MODENGINE}}" = $ModEngineFolderPath.TrimEnd("/", "\")
            }
    }

    if (!(ModEngineValid)) {
        try {
            Write-Host "Installing ModEngine and organizing files..."
            Invoke-OwlDownloadAndExtractZip -Uri $Settings.MODENGINE.DownloadURL -DestinationPath $ModEngineFolderPath -ErrorAction Stop
            $ModEngineExtractedFolderName = Split-Path $Settings.MODENGINE.DownloadURL -leaf
            $ModEngineExtractedFolderName = $ModEngineExtractedFolderName.Substring(0, $ModEngineExtractedFolderName.LastIndexOf('.'))
            $ModEngineExtractedFolderPath = Get-OwlFullPath -Base $ModEngineFolderPath -Path $ModEngineExtractedFolderName
            Get-ChildItem -Path $ModEngineExtractedFolderPath -Recurse -ErrorAction Stop | Move-Item -Destination $ModEngineFolderPath -ErrorAction Stop
            Remove-Item $ModEngineExtractedFolderPath
        }
        catch {
            Write-OwlError $_
        }
        finally {
            if (!(ModEngineValid)) {
                Write-OwlError "ModEngine Files are invalid and automatic installation failed."
                $question = "Do you want to continue anyway?"
                $choices  = @(
                    [System.Management.Automation.Host.ChoiceDescription]::new("&Yes", "Proceed despite missing critical files")
                    [System.Management.Automation.Host.ChoiceDescription]::new("&No", "Abort attempt to launch and install mod")
                )
                $decision = $Host.UI.PromptForChoice($title, $question, $choices, 1)
                if ($decision -eq 1) {
                    exit 1
                }
            }
            else {
                Write-Host "Installed ModEngine" -ForegroundColor "green"
            }
        }
    }
}