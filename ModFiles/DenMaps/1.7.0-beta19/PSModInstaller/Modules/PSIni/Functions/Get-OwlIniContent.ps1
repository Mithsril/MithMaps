function Get-OwlIniContent {
    [CmdletBinding(DefaultParameterSetName = "AbsolutePath")]
    [OutputType(
        [System.Collections.Specialized.OrderedDictionary]
    )]
    Param(
        # Specifies the path to the input file.
        [ValidateNotNullOrEmpty()]
        [Parameter(Position = 0, Mandatory = $true, ParameterSetName = "AbsolutePath", ValueFromPipeline = $true )]
        [String]
        $FilePath,

        [ValidateNotNullOrEmpty()]
        [Parameter(Mandatory = $true, ParameterSetName = "RelativePath")]
        [Alias("RelPath")]
        [String]
        $RelativeFilePath,

        # Specify what characters should be describe a comment.
        # Lines starting with the characters provided will be rendered as comments.
        # Default: ";"
        [Char[]]
        $CommentChar = @(";"),

        # Remove lines determined to be comments from the resulting dictionary.
        [Switch]
        $IgnoreComments
    )

    begin {
        Write-Debug "PsBoundParameters:"
        $PSBoundParameters.GetEnumerator() | ForEach-Object { Write-Debug $_ }
        if ($PSBoundParameters['Debug']) {
            $DebugPreference = 'Continue'
        }
        Write-Debug "DebugPreference: $DebugPreference"

        Write-Verbose "$($MyInvocation.MyCommand.Name):: Function started"
    }

    process {
        if ($PSBoundParameters.ContainsKey('RelativeFilePath')){
            $PSBoundParameters.FilePath = [System.IO.Path]::GetFullPath(
                (Join-Path $MyInvocation.PSScriptRoot -ChildPath $PSBoundParameters.RelativeFilePath)
            )
            $FilePath = $PSBoundParameters.FilePath
            $PSBoundParameters.Remove('RelativeFilePath') > $null
        }

        $iniContent = Get-IniContent @PSBoundParameters
        $iniContent | Add-Member NoteProperty -Name "FilePath" -Value $FilePath
        $iniContent | Add-Member ScriptMethod -Name "Save" -Value {
            $this | Out-IniFile $this.FilePath -Force -Pretty -Loose
        }

        return $iniContent
    }

    End {
        Write-Verbose "$($MyInvocation.MyCommand.Name):: Function ended"
    }
}
