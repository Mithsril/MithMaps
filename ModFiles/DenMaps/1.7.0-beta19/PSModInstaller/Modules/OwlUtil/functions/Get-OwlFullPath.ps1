function Get-OwlFullPath {
    [CmdletBinding()]
    param(
        [parameter(Position = 0, Mandatory, ValueFromPipeline, ValueFromRemainingArguments)]
        [alias('RelativePath')]
        [string[]]$Path,

        [parameter()]
        [alias('Base')]
        [string]$BasePath = $MyInvocation.PSScriptRoot
    )

    process {
        $AllPaths = @($BasePath) + $Path
        [System.IO.Path]::GetFullPath((Join-OwlPath @AllPaths))
    }
}