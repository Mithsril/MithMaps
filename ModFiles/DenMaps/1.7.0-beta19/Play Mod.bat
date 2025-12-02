@ECHO OFF && TITLE Launch DEN Maps Mod
SET ThisScriptsDirectory=%~dp0
SET PowerShellScriptPath=%ThisScriptsDirectory%\ModFiles\DenMaps\1.7.0-beta19\PSModInstaller\PlayMod.ps1

@REM if PSModInstaller folder exists, and DenMaps not
IF EXIST "%ThisScriptsDirectory%\PSModInstaller" (
    IF NOT EXIST "%ThisScriptsDirectory%\DenMaps" (
        SET PowerShellScriptPath="%ThisScriptsDirectory%\PSModInstaller\PlayMod.ps1"
    )
)
PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& '%PowerShellScriptPath%'";
