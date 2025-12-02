function Test-OwlAreFilesValid {
    [cmdletbinding()]
    param(
        [parameter(mandatory)]
        [string]$ValidationJsonPath,

        [parameter(mandatory)]
        [hashtable]$PathPlaceholders
    )

    begin {
        Import-Module $(Split-Path -Parent $PSScriptRoot | Split-Path -Parent | Join-Path -ChildPath "OwlUtil") -Function "Write-OwlVerbose" -Verbose:$false
    }

    process{
        $AllValid = $true

        if (!(Test-Path $ValidationJsonPath)) {
            $AllValid = $false
            return $AllValid
        }

        $FilesToValidate = Get-Content -Raw $ValidationJsonPath | ConvertFrom-Json

        if ($FilesToValidate.PSobject.Properties.name -contains "HashList") {
            $FilesToValidate = $FilesToValidate.HashList
        }

        foreach ($File in $FilesToValidate) {

            foreach ($Placeholder in $PathPlaceholders.GetEnumerator()){
                $File.Path = $File.Path -replace $Placeholder.Name, $Placeholder.Value
            }

            $VerboseOwlMessage = Write-OwlVerbose $File.Path -FailPassPending

            try {
                if ($File.PSobject.Properties.name -contains "Hash") {
                    $Valid = Compare-OwlFileHash `
                        -Path $File.Path `
                        -Hash $File.Hash `
                        -Algorithm $File.Algorithm
                }
                else {
                    $Valid = Test-Path $File.Path -PathType Leaf
                }
            }
            catch{
                Write-Verbose $_
                $Valid = $false
            }


            if ($Valid) {
                Write-OwlVerbose -Pass $VerboseOwlMessage
            }
            else {
                Write-OwlVerbose -Fail $VerboseOwlMessage
                $AllValid = $false
            }
        }

        return $AllValid
    }
}
