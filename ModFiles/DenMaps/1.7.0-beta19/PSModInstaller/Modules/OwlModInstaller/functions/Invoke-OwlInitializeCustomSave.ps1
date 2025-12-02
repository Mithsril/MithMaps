function Invoke-OwlInitializeCustomSave {
    [cmdletbinding()]
    param(
        [Parameter(mandatory)]
        $Settings,

        [Parameter()]
        [string]$ScriptDir = $MyInvocation.PSScriptRoot
    )

    if ((Test-OwlIsSteamUserLoggedIn) -eq $false) {
        $LoginWarningMessage = "You are not logged into steam, please log in first"
        $StoredCursorPosition = $Host.UI.RawUI.CursorPosition
        Write-Warning $LoginWarningMessage

        While ((Test-OwlIsSteamUserLoggedIn) -eq $false) {
            Start-Sleep -Seconds 1
        }

        # overwrite warning message with success message to avoid end user confusion
        $LoginSuccessMessage = "Logged in, proceeding"
        $Host.UI.RawUI.CursorPosition = $StoredCursorPosition
        [Console]::ForegroundColor = "green"
        Write-Host $LoginSuccessMessage(" " * $LoginWarningMessage.Length)
        [Console]::ResetColor()
    }

    $ModExtension = $Settings.SEAMLESS.SaveFileExtension
    $ExcludedSaveExtensions = $Settings.DENMAPS.ExcludedSaveFiles.Split(";")
    $SteamID64 = Get-OwlActiveUserSteamID64
    $HasModSave = Test-OwlIsSaveFilePresent -ID $SteamID64 -Ext $ModExtension

    if ($HasModSave -eq $false) {
        try {
            Copy-OwlSaveFile -ID $SteamID64 -SourceExtensions @("den", "sl2", "co2") -ExcludedSaves $ExcludedSaveExtensions -NewExt $ModExtension -ErrorAction Stop
            Write-Host "Created a separated new save file for use with the mod (.$ModExtension)"
        }
        catch {
            Write-Warning "Could not copy save file (required for the mod to not affect your other saves)"
            Write-Host $_
            Read-Host -Prompt "Press enter to exit"
            exit 1
        }
    }

    $SeamlessIniPath = Get-OwlFullPath -Base $ScriptDir -Path "$($Settings.PATHS.SeamlessFolderPath)/SeamlessCoop/ersc_settings.ini"
    $SeamlessIni = Get-OwlIniContent $SeamlessIniPath
    if ($ModExtension -cne $SeamlessIni["SAVE"].save_file_extension) {
        $SeamlessIni["SAVE"].save_file_extension = $ModExtension
        $SeamlessIni.Save()
    }
}
