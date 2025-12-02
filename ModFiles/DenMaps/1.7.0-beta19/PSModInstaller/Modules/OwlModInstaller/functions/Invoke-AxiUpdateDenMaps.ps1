function Invoke-AxiUpdateDenMaps {
    [cmdletbinding()]
    param(
        [Parameter(mandatory)]
        $Settings,

        [Parameter(mandatory)]
        $UserSettings,

        [Parameter(mandatory)]
        [string]$RootFolderPath,

        [Parameter()]
        [string]$ScriptDir = $MyInvocation.PSScriptRoot
    )

    $DenMapsFolderPath = Get-OwlFullPath -Base $ScriptDir -Path $Settings.PATHS.DenMapsFolderPath | Split-Path -Parent
    $CurrentSeamlessFolderPath = Get-OwlFullPath -Base $ScriptDir -Path $Settings.PATHS.SeamlessFolderPath
    $SeamlessFolderPath = $CurrentSeamlessFolderPath | Split-Path -Parent

    try {
        Write-Host "Checking for DEN Maps updates..." -ForegroundColor "green"
        # if there is $UserSettings._.Repository, use it, otherwise use $Settings.DENMAPS.Repository
        if ($null -ne $UserSettings._.Repository) {
            $Repository = $UserSettings._.Repository
        }
        else {
            $Repository = $Settings.DENMAPS.Repository
        }
        $PrivateBetaKey = $UserSettings._.PrivateBetaKey
        $NewVersion = Get-AxiCheckUpdates -Repository $Repository `
            -CurrentVersion $Settings.DENMAPS.CurrentVersion `
            -ExcludedVersions $Settings.DenMapsExcludedVersions.Values `
            -DenMapsFolderPath $DenMapsFolderPath `
            -PrivateBetaKey $PrivateBetaKey

        if ($null -eq $NewVersion) {
            Write-Host "DEN Maps is up to date" -ForegroundColor "green"
            return
        }
        else {
            if ($Settings.DENMAPS.SkipUpdatePrompt -eq $false) {
                Clear-Host
                Write-OwlHeader "DEN Maps updater" -BackgroundColor "yellow"
                $title = "New version of DEN Maps found: $($NewVersion.VersionName)"
                $question = "Do you want to update?"
                $choices = @(
                    [System.Management.Automation.Host.ChoiceDescription]::new("&Yes", "Update DEN Maps")
                    [System.Management.Automation.Host.ChoiceDescription]::new("&No", "Do not update DEN Maps")
                )
                $decision = $Host.UI.PromptForChoice($title, $question, $choices, 0)
            }
            else {
                $decision = 0
            }
            if ($decision -eq 0) {
                Clear-Host
                Write-Host "Downloading DEN Maps update..." -ForegroundColor "blue"
                Invoke-OwlDownloadAndExtractZip -Uri $NewVersion.DownloadURL -DestinationPath $RootFolderPath -PrivateBetaKey $PrivateBetaKey -ErrorAction Stop
                Write-Host "Installed DEN maps $($NewVersion.VersionName)" -ForegroundColor "green"
            }
            else {
                Write-Host "Skipped DEN Maps update" -ForegroundColor "Yellow"
                return
            }
        }

        # Get all versions, except the current and the new one
        $OldInstallations = Get-ChildItem -Path $DenMapsFolderPath -Directory | Where-Object { $_.Name -ne $Settings.DENMAPS.CurrentVersion -and $_.Name -ne $NewVersion.SemVer.ToString() }
        $OldSeamlessInstallations = Get-ChildItem -Path $SeamlessFolderPath -Directory |
        Where-Object { $_.FullName -ne $CurrentSeamlessFolderPath } |
        ForEach-Object {
            $semVer = $null
            try {
                $semVer = Get-AxiSemVer -Version $_.Name
            }
            catch {
                Write-Output $_
            }

            if ($null -ne $semVer) {
                [PSCustomObject]@{
                    Folder = $_
                    SemVer = $semVer
                }
            }
        } | Sort-Object -Property SemVer -Descending |
        Select-Object -Skip 1

        if ($OldSeamlessInstallations) {
            foreach ($oldSeamlessInstallation in $OldSeamlessInstallations) {
                Remove-Item $oldSeamlessInstallation.Folder.FullName -Recurse -Force -ErrorAction Continue
            }
        }
        if ($OldInstallations) {
            Clear-Host
            Write-OwlHeader "DEN Maps updater" -BackgroundColor "yellow"
            $title = "Old DEN Maps installations found: $($OldInstallations.Name -join ", ")"
            $question = "Do you want to remove them? (it won't affect your saves)"
            $choices = @(
                [System.Management.Automation.Host.ChoiceDescription]::new("&Yes", "Remove old DEN Maps installations")
                [System.Management.Automation.Host.ChoiceDescription]::new("&No", "Do not remove old DEN Maps installations")
            )
            $decision = $Host.UI.PromptForChoice($title, $question, $choices, 0)
            if ($decision -eq 0) {
                foreach ($oldInstallation in $OldInstallations) {
                    Remove-Item $oldInstallation.FullName -Recurse -Force -ErrorAction Stop
                }
                Write-Host "Removed old DEN Maps installations" -ForegroundColor "green"
            }
        }
        # Execute PlayMod.ps1 in new DEN Maps folder and pass SkipUpdates as argument
        $PlayModPath = Join-Path $DenMapsFolderPath $NewVersion.SemVer.ToString() | Join-Path -ChildPath "PSModInstaller/PlayMod.ps1"
        Clear-Host
        Write-Host "Launching new DEN Maps version..." -ForegroundColor "green"
        try {
            Start-Process -FilePath PowerShell.exe -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PlayModPath`" -SkipUpdates -PostUpdate" -NoNewWindow
        }
        finally {
            Exit
        }
    }
    catch {
        Write-OwlError $_
        Write-Host "Error updating DEN Maps, skipping..." -ForegroundColor "red"
    }
}
