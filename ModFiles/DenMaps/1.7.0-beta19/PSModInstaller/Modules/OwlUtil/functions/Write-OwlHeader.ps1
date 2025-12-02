function Write-OwlHeader {
    [CmdletBinding()]
    param (
        [ValidateNotNullOrEmpty()]
        [String]$Message = $args[0],

        [ValidateNotNullOrEmpty()]
        [String]$BackgroundColor = "green",

        [ValidateNotNullOrEmpty()]
        [String]$ForegroundColor = "black"
    )

    process {
        [Console]::ForegroundColor = $ForegroundColor
        [Console]::BackgroundColor = $BackgroundColor
        [Console]::Error.WriteLine("$Message")
        [Console]::ResetColor()
    }
}
