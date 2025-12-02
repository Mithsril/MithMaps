function Write-OwlVerbose {
    [OutputType('VerboseOwlMessage')]
    [CmdletBinding()]
    param(
        [parameter(Position = 0, ValueFromPipeline)]
        [string]$Message,

        [parameter()]
        [switch]$FailPassPending,

        [parameter()]
        [PSTypeName('VerboseOwlMessage')]$Fail,

        [parameter()]
        [PSTypeName('VerboseOwlMessage')]$Pass
    )

    begin{
        if (-not $PSBoundParameters.ContainsKey('Verbose')) {
            $VerbosePreference = $PSCmdlet.GetVariableValue('VerbosePreference')
        }
        $IsVerbose = ($PSBoundParameters['Verbose'] -or $VerbosePreference -eq 'Continue')
        function OverwriteMessageStart ($Text, $TextColor, $CursorPositionLineStart) {
            $CursorPositionLineEnd = $Host.UI.RawUI.CursorPosition
            $Host.UI.RawUI.CursorPosition = $CursorPositionLineStart
            [Console]::ForegroundColor = $TextColor
            Write-Host $Text
            [Console]::ResetColor()
            $Host.UI.RawUI.CursorPosition = $CursorPositionLineEnd
        }
    }

    process {
        if ($IsVerbose -eq $false) { return }
        if ($PSBoundParameters.ContainsKey('Fail')) {
            OverwriteMessageStart "[FAIL]" "red" $Fail.CursorPositionLineStart
        }
        elseif ($PSBoundParameters.ContainsKey('Pass')) {
            OverwriteMessageStart "[PASS]" "green" $Pass.CursorPositionLineStart
        }
        elseif ($FailPassPending) {
            $Message = "[....] $Message"
    
            $CursorPositionLineStart = $Host.UI.RawUI.CursorPosition
            $CursorPositionLineStart.X += 9 #skip over "VERBOSE: "
    
            $VerboseOwlMessage = [PSCustomObject]@{
                PSTypeName = 'VerboseOwlMessage'
                CursorPositionLineStart = $CursorPositionLineStart 
            }

            Write-Verbose $Message
            return $VerboseOwlMessage
        }
        else{
            Write-Verbose $Message
        }        
    }
}