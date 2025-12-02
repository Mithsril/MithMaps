function Test-OwlIsSteamUserLoggedIn {
    [CmdletBinding()]
    param()

    process {
        $SteamID3 = Get-ItemPropertyValue "HKCU:\Software\Valve\Steam\ActiveProcess" -Name ActiveUser

        if ($SteamID3 -eq 0) { 
            return $false
        }
        else {
            return $true
        }

    }
}