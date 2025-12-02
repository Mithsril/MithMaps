function Invoke-OwlFileBrowser{
    [CmdletBinding()]
    param(
        [String]$Title = "",
        [String]$InitialDirectory = [Environment]::GetFolderPath('Desktop'),
        [String]$Filter = "All files (*.*)|*.*",
        [Bool]$Multiselect = $false,
        [Bool]$ShowHelp = $false,
        [String]$ErrorMsg = "You did not select a valid file"
    )

    process {
        Add-Type -AssemblyName System.Windows.Forms
        $FileBrowser = new-object Windows.Forms.OpenFileDialog
        $FileBrowser.Title = $Title
        $FileBrowser.InitialDirectory = $InitialDirectory
        $FileBrowser.Filter = $Filter
        $FileBrowser.ShowHelp = $ShowHelp
        $FileBrowser.Multiselect = $Multiselect
        $result = $FileBrowser.ShowDialog()
        if ($result -ne [System.Windows.Forms.DialogResult]::OK) {
            throw [System.IO.FileNotFoundException] $ErrorMsg
        }
        if ($FileBrowser.Multiselect) { $FileBrowser.FileNames }
        else { $FileBrowser.FileName }
    }
}
