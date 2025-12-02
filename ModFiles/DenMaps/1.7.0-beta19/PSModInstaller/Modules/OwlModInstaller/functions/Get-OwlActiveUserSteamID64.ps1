function Get-OwlActiveUserSteamID64 {
    [CmdletBinding()]
    param()

    begin {
        $SteamID64Ident = 76561197960265728
    }

    process {
        $SteamID3 = Get-ItemPropertyValue "HKCU:\Software\Valve\Steam\ActiveProcess" -Name ActiveUser
        $SteamID64 = $SteamID3 + $SteamID64Ident

        if ($SteamID3 -eq 0) { return 0 }
        return $SteamID64
    }
}