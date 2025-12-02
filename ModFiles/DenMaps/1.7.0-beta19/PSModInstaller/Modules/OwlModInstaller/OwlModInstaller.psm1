$functionpath = Split-Path -parent $MyInvocation.MyCommand.Path | Join-Path -ChildPath "functions"
$functionlist = Get-ChildItem -Path $functionpath -Name

foreach ($function in $functionlist){
    . (Join-Path -Path $functionpath -ChildPath $function)
}