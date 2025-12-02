function Join-OwlPath {
    [CmdletBinding()]
    param(
        [parameter(Mandatory, Position = 0, ValueFromPipeline, ValueFromRemainingArguments)]
        [ValidateCount(1, [int]::MaxValue)]
        [string[]]$Path
    )

    process {
        $JoinedPath, [string[]]$ChildPaths = $Path
        foreach($ChildPath in $ChildPaths ){
            $JoinedPath = Join-Path $JoinedPath -ChildPath $ChildPath
        }
        return $JoinedPath
    }
}