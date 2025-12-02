function Invoke-AxiFirstTimeInstallSettings {
    [cmdletbinding()]
    param(
        [Parameter(mandatory)]
        $UserSettings,

        [Parameter()]
        [string]$ScriptDir = $MyInvocation.PSScriptRoot
    )

    $PasswordBehavior = $UserSettings._.PasswordBehavior
    $DefaultCooppassword = $UserSettings._.DefaultCooppassword
    $PasswordDescription = $UserSettings._.PasswordDescription

    Clear-Host
    Write-OwlHeader "First time install setup" -BackgroundColor "blue"

    $title = "Choose password behavior. (applies every launch)"
    $choices = @(
        "Always ask me for a new password."
        "Remember the password from the previous session."
        "Reset the password to a default value. (you can choose this default in the next step)"
    )
    $decision = Get-OwlChoice $title $choices 2 # Third choice is default.

    Clear-Host
    Write-OwlHeader "First time install setup" -BackgroundColor "blue"

    if ($decision -eq 0) {
        # Always ask me for a new password.
        $PasswordBehavior = "1"
    }
    elseif ($decision -eq 1) {
        # Remember the password from the previous session.
        $PasswordBehavior = "2"
    }
    else {
        # Reset the password to a default value.
        $PasswordBehavior = "3"

        $title = "Do you want to change the default password (currently: `"$DefaultCooppassword`")?"
        $choices = @(
            [System.Management.Automation.Host.ChoiceDescription]::new("&Yes", "Set your own default password.")
            [System.Management.Automation.Host.ChoiceDescription]::new("&No", "Use `"$DefaultCooppassword`". $PasswordDescription")
        )
        $decision = $Host.UI.PromptForChoice($title, $question, $choices, 1)
        if ($decision -eq 0) {
            $DefaultCooppassword = Read-Host "`nEnter the default password you want to use"
            $PasswordDescription = "Custom default password"
        }
    }

    Clear-Host

    $UserSettings._.PasswordBehavior = $PasswordBehavior
    $UserSettings._.DefaultCooppassword = $DefaultCooppassword
    $UserSettings._.PasswordDescription = $PasswordDescription
    $UserSettings.Save()
}
