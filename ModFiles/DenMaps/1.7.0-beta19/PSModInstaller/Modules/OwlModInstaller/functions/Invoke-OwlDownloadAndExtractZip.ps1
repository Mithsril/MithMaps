function Invoke-OwlDownloadAndExtractZip {
    [CmdletBinding(SupportsShouldProcess)]
    param (
        [Parameter(Mandatory = $true)]
        [Uri]$Uri,
        [Parameter(Mandatory = $true)]
        [String]$DestinationPath,
        [Parameter(Mandatory = $false)]
        [String]$PrivateBetaKey
    )

    begin {
        function Unzip {
            param (
                [Parameter(Mandatory = $true)]
                [string]$Path,

                [Parameter(Mandatory = $true)]
                [String]$DestinationPath,

                [Parameter(Mandatory = $false)]
                [bool]$Overwrite
            )

            Add-Type -AssemblyName "System.IO.Compression.FileSystem"
            $archive = [System.IO.Compression.ZipFile]::OpenRead($Path)
            try {
                foreach ($entry in $archive.Entries) {
                    $entryTargetFilePath = [System.IO.Path]::Combine($DestinationPath, $entry.FullName)
                    $entryDir = [System.IO.Path]::GetDirectoryName($entryTargetFilePath)

                    #Ensure the directory of the archive entry exists
                    [System.IO.Directory]::CreateDirectory($entryDir) > $null

                    #If the entry is not a directory entry, then extract entry
                    if (!$entryTargetFilePath.EndsWith("\") -And !$entryTargetFilePath.EndsWith("/")) {
                        [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $entryTargetFilePath, $Overwrite);
                    }
                }
            }
            finally {
                $archive.Dispose()
            }
        }
    }

    process {
        $tmp = New-TemporaryFile -ErrorAction stop | Rename-Item -NewName { $_ -replace "tmp$", "zip" } -PassThru -ErrorAction stop


        $Headers = @{
            "User-Agent" = "OwlModInstaller"
            "Accept"     = "application/octet-stream"
        }
        if ($PrivateBetaKey) {
            $Headers.Add("Authorization", "token $PrivateBetaKey")
        }
        $OriginalProgressPreference = $global:ProgressPreference
        $global:ProgressPreference = "SilentlyContinue"

        Invoke-WebRequest $Uri -OutFile $tmp -Headers $Headers -ErrorAction stop
        Unzip -Path $tmp -DestinationPath $DestinationPath -Overwrite $true

        $global:ProgressPreference = $OriginalProgressPreference
        $tmp | Remove-Item
    }
}
