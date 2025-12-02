function Write-OwlObject {
    [CmdletBinding()]
    param(
        [parameter(Position = 0, Mandatory, ValueFromPipeline)]
        [Object]$Object
    )

    process {
        $PSBoundParameters.Remove('Object') > $null
        Write-Host ($Object | Format-List -Expand Both | Out-String) @PSBoundParameters
    }
}