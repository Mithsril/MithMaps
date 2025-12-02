function Write-OwlError {
    [CmdletBinding()]
    param (
        [ValidateNotNullOrEmpty()]
        [String]$Message = $args[0]
    )

    process {
        [Console]::ForegroundColor = "red"
        [Console]::BackgroundColor = "black"
        [Console]::Error.WriteLine("ERROR: $Message")
        [Console]::ResetColor()
    }
}