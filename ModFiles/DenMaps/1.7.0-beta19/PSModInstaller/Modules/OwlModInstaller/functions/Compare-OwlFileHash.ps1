function Compare-OwlFileHash {
    [cmdletbinding()]
    param(
        [Parameter(mandatory)]
        [string]$Path,

        [Parameter(mandatory)]
        [Alias('Hash')]
        [string]$Expected,

        [Parameter()]
        [ValidateSet("SHA1", "SHA256", "SHA384", "SHA512", "MACTripleDES", "MD5", "RIPEMD160")]
        [string]$Algorithm = "SHA256"
    )

    try {
        $FileHash = Get-FileHash -Path $Path -Algorithm $Algorithm -ErrorAction Stop
    }
    catch {
        throw $_
    }

    if ($FileHash.Hash -eq $Expected) {
        return $true
    }
    else {
        return $false
    }
}