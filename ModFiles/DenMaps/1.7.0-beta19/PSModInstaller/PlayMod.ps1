Param(
    [Parameter()]
    [switch]$SkipUpdates = $false,

    [Parameter()]
    [switch]$PostUpdate = $false
)
$ErrorActionPreference = "Continue"
$ScriptDir = Split-Path -parent $MyInvocation.MyCommand.Path
# root script dir is 4 levels up from ScriptDir
$RootFolder = Split-Path -parent $ScriptDir | Split-Path -parent | Split-Path -parent | Split-Path -parent
Import-Module $ScriptDir/Modules/OwlUtil

if (Get-OwlIsPSOlderThan("5.0")) {
    Write-OwlError "Powershell version outdated"
    Read-Host -Prompt "Please install powershell version 5.0 or greater, then retry`n`n`nPress Enter to exit"
    exit 1
}

Import-Module $ScriptDir/Modules/OwlModInstaller
Import-Module $ScriptDir/Modules/PSIni

$Settings = Get-OwlIniContent -RelPath "./InstallerSettings.ini"
$CurrentUserSettings = Join-Path $RootFolder "settings.ini" | Get-OwlIniContent
$UserSettings = Join-Path $RootFolder "settings.ini" | Get-OwlIniContent -IgnoreComments

if ($PostUpdate) {
    foreach ($path in $Settings.PostUpdateForcedCleanupPaths.Values) {
        $path = Join-Path $RootFolder $path
        if (Test-Path $path) {
            Remove-Item $path -Recurse -Force -ErrorAction Stop
        }
    }
}

# _ = top level/no section
$DefaultUserSettings = @(
    @{ Section = "_"; key = "DefaultCooppassword"; default = $Settings.SEAMLESS.DefaultCooppassword }
    @{ Section = "_"; key = "PasswordDescription"; default = $Settings.SEAMLESS.PasswordDescription }
    @{ Section = "_"; key = "PasswordBehavior"; default = $Settings.SEAMLESS.PasswordBehavior; comment = @(
            "Changes how your password is handled each time you start the mod."
            "1 = Always ask me for a new password without any other prompts."
            "2 = Remember the password from the previous session, then ask me if I want to change it."
            "3 = Reset the password to the default password, then ask me if I want to change it."
        )
    }
    @{ Section = "_"; key = "LastUpdateCheck"; default = ""; comment = @(
            "Last time the installer checked for updates. Do not modify this value."
        )
    }
)


$CommentCount = 0
Foreach ($Setting in $DefaultUserSettings) {
    if (!$UserSettings.Contains($Setting.Section)) {
        $UserSettings[$Setting.Section] = New-Object System.Collections.Specialized.OrderedDictionary([System.StringComparer]::OrdinalIgnoreCase)
    }
    if (!$UserSettings[$Setting.Section].Contains($Setting.key)) {
        $UserSettings[$Setting.Section][$Setting.key] = $Setting.default
    }
    if ($Setting.contains("comment")) {
        $SettingIndex = $($UserSettings[$Setting.Section].get_keys()).indexOf($Setting.key)
        for ($i = 0; $i -lt $Setting.comment.Length; $i++) {
            $name = "Comment" + ++$CommentCount
            $UserSettings[$Setting.Section].Insert($SettingIndex + $i, $name, "; " + $Setting.comment[$i])
        }
    }
}

$MustSave = $false
foreach ($Section in $UserSettings.get_keys()) {
    if (!$CurrentUserSettings.Contains($Section)) {
        $MustSave = $true
        break
    }
    foreach ($entry in $UserSettings[$Section].get_keys()) {
        if (!$CurrentUserSettings[$Section].Contains($entry)) {
            $MustSave = $true
            break
        }
        if ($UserSettings[$Section][$entry] -cne $CurrentUserSettings[$Section][$entry]) {
            $MustSave = $true
            break
        }
    }
}


if ($UserSettings._.Contains("FixSaveData")) {
    $UserSettings._.Remove("FixSaveData")
    $MustSave = $true
}


try {
    $LastUpdateCheck = [DateTime]::Parse($UserSettings._.LastUpdateCheck)
}
catch {
    $UserSettings._.LastUpdateCheck = ""
}



$ShouldCheckForUpdates = (
    ("" -eq $UserSettings._.LastUpdateCheck -or $LastUpdateCheck.AddMinutes(2) -lt (Get-Date)) -and
    ($SkipUpdates -eq $false -and $UserSettings._.SkipUpdates -ne "true") -or
    $Settings.DENMAPS.SkipUpdatePrompt -eq "true"
)

if ($ShouldCheckForUpdates) {
    Invoke-AxiUpdateDenMaps $Settings $UserSettings $RootFolder
    $UserSettings._.LastUpdateCheck = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $MustSave = $true
}

if ($MustSave) {
    $UserSettings.Save()
}

$EldenRingFolderPath = Get-OwlSteamGamePath -AppId 1245620 -KnownFilePath "./Game/eldenring.exe" -FallbackToManual

if ($null -eq $EldenRingFolderPath -or !(Test-Path $EldenRingFolderPath -PathType Container)) {
    $errorMsg = "Could not locate your Elden Ring install directory"
    if ($EldenRingFolderPath) { $errorMsg += " at:`n$EldenRingFolderPath" }
    Write-OwlError $errorMsg
    Read-Host -Prompt "Press enter to exit"
    exit 1
}

Invoke-OwlInstallSeamlesscoop $Settings $EldenRingFolderPath
Invoke-OwlInstallModEngine $Settings # practically a copy of "OwlInstallSeamlesscoop"
Invoke-OwlValidateDENMaps $Settings # practically a copy of "OwlInstallSeamlesscoop"
Invoke-OwlInitializeCustomSave $Settings
Clear-Host

Write-OwlHeader $Settings.GENERAL.ModReadyMessage
Invoke-OwlConfigurePassword $Settings $UserSettings

$ModEngineLaunchBatPath = Get-OwlFullPath $Settings.PATHS.ModEngineLaunchBatPath
$ModEngineFolderPath = Split-Path -parent $ModEngineLaunchBatPath

$EldenRingProcess = Get-Process -Name eldenring -ErrorAction SilentlyContinue
if ($EldenRingProcess) {
    Write-Host "Elden Ring is running, trying to close it"
    Stop-Process -Name eldenring -Force
}

Write-Host "Starting Elden Ring..."
Start-Process -FilePath $ModEngineLaunchBatPath -WorkingDirectory $ModEngineFolderPath
# wait for Elden Ring to start and some more time so user can see messages if something goes wrong
$EldenRingProcess = Get-Process -Name eldenring -ErrorAction SilentlyContinue
while ($null -eq $EldenRingProcess) {
    $EldenRingProcess = Get-Process -Name eldenring -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}
Start-Sleep -Seconds 2
exit 0
