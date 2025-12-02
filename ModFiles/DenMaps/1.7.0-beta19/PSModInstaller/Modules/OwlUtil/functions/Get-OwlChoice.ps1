function Get-OwlChoice {
    [CmdletBinding()]
    Param
    (
        [Parameter(Mandatory=$true,Position=0)]
        $Title,

        [Parameter(Mandatory=$true,Position=1)]
        [String[]]
        $Options,

        [Parameter(Position=2)]
        $DefaultChoice = -1
    )
    if ($DefaultChoice -ne -1 -and ($DefaultChoice -gt $Options.Count -or $DefaultChoice -lt 1)){
        Write-Warning "DefaultChoice needs to be a value between 1 and $($Options.Count) or -1 (for none)"
        exit
    }
    
    $index = 1
    $validAnswers = [System.Collections.ArrayList]@()
    Write-Host $Title
    foreach ($option in $Options){
        Write-Host "[$index] $option"
        $validAnswers.Add("$index") > $null
        $index++
    }

    $ChoicePrompt = "Choice"
    if ($DefaultChoice -ne -1) {
        $ChoicePrompt += "(default is `"$($DefaultChoice + 1)`")"
    }
    $InvalidChoicePrompt = "Choice must be a number between 1 and $($options.Count). Type in a number and press enter."
    $InvalidInput = $false
    $SavedCursorPosition = $Host.UI.RawUI.CursorPosition

    do {
        # Partially clear console
        $Host.UI.RawUI.CursorPosition = $SavedCursorPosition
        Write-Host "$(" "*$InvalidChoicePrompt.Length)`n$(" "*($ChoicePrompt.Length + 50))"
        $Host.UI.RawUI.CursorPosition = $SavedCursorPosition

        if ($InvalidInput) { Write-Host $InvalidChoicePrompt -ForegroundColor Red}
        $Choice = Read-Host $ChoicePrompt
        if (($DefaultChoice -ne -1) -and ($Choice -eq "")) {
            $Choice = "$($DefaultChoice + 1)"
        }

        $InvalidInput = $true # only loops if input was invalid, so I prep it here for the next loop if it happens.
    } until ($validAnswers -contains $Choice)
    
    $validAnswers.IndexOf($Choice)
}
