function Get-OwlPSVersion {
    [CmdletBinding()]
    param()
    process{
        if (test-path variable:psversiontable) {$psversiontable.psversion} else {[version]"1.0.0.0"}
    }
}