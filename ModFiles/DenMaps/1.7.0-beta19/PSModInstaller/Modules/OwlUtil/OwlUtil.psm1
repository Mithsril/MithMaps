$classpath = Split-Path -parent $MyInvocation.MyCommand.Path | Join-Path -ChildPath "classes"
$classlist = Get-ChildItem -Path $classpath -Name

foreach ($class in $classlist) {
    . (Join-Path -Path $classpath -ChildPath $class)
}

$functionpath = Split-Path -parent $MyInvocation.MyCommand.Path | Join-Path -ChildPath "functions"
$functionlist = Get-ChildItem -Path $functionpath -Name

foreach ($function in $functionlist) {
    . (Join-Path -Path $functionpath -ChildPath $function)
}
