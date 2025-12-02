function Invoke-OwlAskGameFolderPath {
    [CmdletBinding()]
    param ()

    process {
        try {
            Write-Host "Browse to your eldenring.exe File and select it"
            $EldenRingExeFilePath = Invoke-OwlFileBrowser -Title "Browse to your eldenring.exe File" -Filter "Executable (*.exe)|*.exe" -InitialDirectory "C:\Program Files (x86)\Steam\steamapps\common\ELDEN RING\Game" -ErrorMsg "You did not select a valid eldenring.exe file"
            $EldenRingGameFolderPath = Split-Path -parent $EldenRingExeFilePath
            return $EldenRingGameFolderPath
        }
        catch {
            Write-Warning $_
            Read-Host -Prompt "Press enter to exit"
            exit 1
        }
    }
}