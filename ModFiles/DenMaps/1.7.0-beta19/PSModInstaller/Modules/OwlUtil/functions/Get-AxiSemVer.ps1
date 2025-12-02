function Get-AxiSemVer {
    [CmdletBinding()]
    param(
        [parameter(mandatory)]
        $Version
    )

    process {
        if ($Version -is [String]) {
            # if starts with v, remove it
            if ($Version -match "^v") {
                $Version = $Version.Substring(1)
            }
        }
        return [SemVer]$Version
    }
}
