function Test-OwlIsSaveFilePresent {
    [cmdletbinding()]
    param(
        [Parameter(mandatory)]
        [Alias('ID', 'SteamID')]
        [string]$SteamID64,

        [Parameter()]
        [Alias('Ext')]
        [string]$Extension = "sl2"
    )
    
    Test-Path "$env:APPDATA/EldenRing/$SteamID64/ER0000.$Extension" -PathType Leaf
}