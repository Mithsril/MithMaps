function Invoke-OwlConfigurePassword {
    [cmdletbinding()]
    param(
        [Parameter(mandatory)]
        $Settings,

        [Parameter(mandatory)]
        $UserSettings,

        [Parameter()]
        [string]$ScriptDir = $MyInvocation.PSScriptRoot
    )

    $SeamlessIniPath = Get-OwlFullPath -Base $ScriptDir -Path "$($Settings.PATHS.SeamlessFolderPath)/SeamlessCoop/ersc_settings.ini"
    $SeamlessIni = Get-OwlIniContent $SeamlessIniPath
    $PasswordBehavior = $UserSettings._.PasswordBehavior
    $DefaultCooppassword = $UserSettings._.DefaultCooppassword
    $PasswordDescription = $UserSettings._.PasswordDescription

    if ($PasswordBehavior -eq "3" -or $SeamlessIni.PASSWORD.cooppassword -eq "") {
        $Password = $DefaultCooppassword
    }
    else {
        $Password = $SeamlessIni.PASSWORD.cooppassword
    }

    if ($PasswordBehavior -eq "1") {
        $Password = Read-Host "`nEnter password"
    }
    elseif ($PasswordBehavior -eq "2" -or $PasswordBehavior -eq "3") {
        $title = "Password is: `"$Password`""
        $FullPasswordDescription = "`"$Password`""
        if ($Password -eq $DefaultCooppassword) { $FullPasswordDescription += ", $PasswordDescription" }
        $question = "`nDo you want to change it?"
        $choices = @(
            [System.Management.Automation.Host.ChoiceDescription]::new("&Yes", "Use this if you want to set your own password")
            [System.Management.Automation.Host.ChoiceDescription]::new("&No", "Use $FullPasswordDescription.")
        )
        $decision = $Host.UI.PromptForChoice($title, $question, $choices, 1)

        if ($decision -eq 0) {
            $Password = Read-Host "`nEnter password"
        }
    }

    if ($Password -eq "") {
        Write-Host "Got empty password, setting to default: `"$DefaultCooppassword`"" -ForegroundColor "yellow"
        $Password = $DefaultCooppassword
    }

    if ($Password -cne $SeamlessIni.PASSWORD.cooppassword) {
        $SeamlessIni.PASSWORD.cooppassword = $Password
        $SeamlessIni.Save()
    }
}
