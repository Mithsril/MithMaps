function Invoke-OwlInstallSeamlesscoop {
    [cmdletbinding()]
    param(
        [Parameter(mandatory)]
        $Settings,

        [Parameter(mandatory)]
        [string]$EldenRingFolderPath,

        [Parameter()]
        [string]$ScriptDir = $MyInvocation.PSScriptRoot
    )

    $SeamlessFolderPath = Get-OwlFullPath -Base $ScriptDir -Path $Settings.PATHS.SeamlessFolderPath
    function SeamlessValid {
        Test-OwlAreFilesValid `
            -ValidationJsonPath (Get-OwlFullPath -Base $ScriptDir -Path $Settings.SEAMLESS.ValidationJsonPath) `
            -PathPlaceholders @{
                "{{SEAMLESS}}" = $SeamlessFolderPath.TrimEnd("/", "\")
            }
    }

    if (!(SeamlessValid)) {
        try {
            Write-Host "Installing Seamless Co-op and organizing files..."
            Invoke-OwlDownloadAndExtractZip -Uri $Settings.SEAMLESS.DownloadURL -DestinationPath $SeamlessFolderPath -ErrorAction Stop
        }
        catch {
            Write-OwlError $_
        }
        finally {
            if (!(SeamlessValid)) {
                Write-OwlError "Seamless Files are invalid and automatic installation failed."
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
                Write-Host "Installed Seamlesscoop" -ForegroundColor "green"
            }
        }
    }

    # Copy Locale Folder
    # $SeamlessLocaleFolderPath = Join-Path $SeamlessFolderPath -ChildPath "SeamlessCoop/locale"
    # $EldenRingLocaleFolderPath = Join-Path $EldenRingFolderPath -ChildPath "Game/SeamlessCoop/locale"
    # $robocopyOutput = robocopy $SeamlessLocaleFolderPath $EldenRingLocaleFolderPath "*.json" /xo /r:0 | Out-String
    # if ($LASTEXITCODE -ge 8) {
    #     Write-OwlError $robocopyOutput
    #     Write-OwlError "Copying seamless local files failed."
    #     $question = "Do you want to continue anyway?"
    #     $choices  = @(
    #         [System.Management.Automation.Host.ChoiceDescription]::new("&Yes", "Proceed despite missing critical files")
    #         [System.Management.Automation.Host.ChoiceDescription]::new("&No", "Abort attempt to launch and install mod")
    #     )
    #     $decision = $Host.UI.PromptForChoice($title, $question, $choices, 1)
    #     if ($decision -eq 1) {
    #         exit 1
    #     }
    # }

    # Set Default Password and Player Hud Setting
    $SeamlessIniPath = Get-OwlFullPath -Base $ScriptDir -Path "$($Settings.PATHS.SeamlessFolderPath)/SeamlessCoop/ersc_settings.ini"
    $SeamlessIni = Get-OwlIniContent $SeamlessIniPath

    if ($Settings.SEAMLESS.OverheadPlayerDisplay -cne $SeamlessIni.GAMEPLAY.overhead_player_display) {
        $SeamlessIni.GAMEPLAY.overhead_player_display = $Settings.SEAMLESS.OverheadPlayerDisplay
    }
    if ($SeamlessIni.GAMEPLAY.allow_invaders -cne 0) {
        $SeamlessIni.GAMEPLAY.allow_invaders = 0
    }
    if ($SeamlessIni.GAMEPLAY.death_debuffs -cne 0) {
        $SeamlessIni.GAMEPLAY.death_debuffs = 0
    }

    $SeamlessIni.Save()
}
