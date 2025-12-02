function Test-AxiFirstTimeInstall {
    [cmdletbinding()]
    param(
        [Parameter(mandatory)]
        [alias('SeamlessFolder')]
        [string]$SeamlessFolderPath,

        [Parameter(mandatory)]
        [alias('ModEngineFolder')]
        [string]$ModEngineFolderPath,

        [Parameter()]
        [string]$ScriptDir = $MyInvocation.PSScriptRoot
    )

    $SeamlessFolderPath = Get-OwlFullPath -Base $ScriptDir -Path $SeamlessFolderPath
    $ModEngineFolderPath = Get-OwlFullPath -Base $ScriptDir -Path $ModEngineFolderPath

    return -not ((Test-Path $SeamlessFolderPath) -or (Test-Path $ModEngineFolderPath))
}
