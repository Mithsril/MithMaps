Using module ..\..\VdfDeserializer.psm1
function Get-OwlSteamGamePath {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]
        [int]$AppId,

        [Parameter(Mandatory)]
        [string]$KnownFilePath,

        [Switch]$FallbackToManual,

        [string]$ManualInitialDirectory = "C:\Program Files (x86)\Steam\steamapps\common\ELDEN RING\Game"
    )

    begin {
        $VDF = [VdfDeserializer]::new()
        function ValidateWithKnownFilePath {
            param (
                [string]$Path
            )

            if (-not $Path) { return $false }

            $fullKnownFilePath = Join-Path -Path $Path -ChildPath $KnownFilePath
            if (-not (Test-Path -Path $fullKnownFilePath)) {
                Write-Verbose "The path found does not contain the expected file: $KnownFilePath."
                return $false
            }

            return $true
        }

        function Get-PathDepth {
            [OutputType([int])]
            param(
                [string]$Path
            )

            $path = $path.TrimStart(".", "/", "\")
            [int]$count = 0
            while($true){
                try{
                    $path = Split-Path $path -Parent -ErrorAction Stop
                    $count++
                }
                catch {
                    break
                }
            }
            return $count
        }

        function AscendPathDepth {
            param(
                [parameter(Mandatory)]
                [string]$path,

                [parameter(Mandatory)]
                [int]$count
            )

            for ($i = 1; $i -le $count; $i++ ){
                $path = Split-Path $path -Parent
            }
            return $path
        }

        function GetAppmanifestPath([int]$AppId) {
            $SteamPath = Get-ItemPropertyValue "HKCU:\Software\Valve\Steam" -Name SteamPath
            $SteamLibraryFoldersVdfPath = Join-Path $SteamPath -ChildPath "steamapps/libraryfolders.vdf"
            $LibraryFoldersVdf = $VDF.Deserialize((Get-Content -Raw $SteamLibraryFoldersVdfPath)) 
            foreach ($LibraryFolder in $LibraryFoldersVdf.libraryfolders.PSObject.Properties.Value) {
                if ($null -eq $LibraryFolder.apps.$AppId) { continue }
                return (Convert-Path "$($LibraryFolder.path)/steamapps/appmanifest_$AppId.acf")
            }
        }

        function GetFullInstalldirPath([string]$AppmanifestPath){
            $ManifestObject = $VDF.Deserialize((Get-Content -Raw $AppmanifestPath))
            $installdir = $ManifestObject.AppState.installdir
            return (Split-Path $AppmanifestPath -Parent | Join-Path -ChildPath "common/$installdir")
        }

        function GetInstalldirPathManually([string]$KnownFilePath, [string]$ManualInitialDirectory){
            $FileToFind = Split-Path $KnownFilePath -Leaf
            Write-Host "Unable to automatically locate the game path"
            Write-Host "Please select $FileToFind manually."

            try {
                $selectedPath = Invoke-OwlFileBrowser `
                    -Title "Select your $FileToFind file." `
                    -Filter "Allowed | $FileToFind|All Files (*.*)|*.*" `
                    -InitialDirectory $ManualInitialDirectory `
                    -ErrorMsg "You did not select a valid $FileToFind file"
            }
            catch {
                Write-Warning $_
                Read-Host -Prompt "Press enter to exit"
                exit 1
            }
            return AscendPathDepth -path $selectedPath -count $(Get-PathDepth $KnownFilePath)
        }
    }

    process {
        # Attempt to automatically retrieve the game path based on the AppId
        $gamePath = GetFullInstalldirPath (GetAppmanifestPath $AppId)
        $isValidPath = ValidateWithKnownFilePath $gamePath

        # Manual fallback if the game path could not be found automatically
        if (-not $isValidPath -and $FallbackToManual) {
            $gamePath = GetInstalldirPathManually $KnownFilePath $ManualInitialDirectory
            $isValidPath = ValidateWithKnownFilePath $gamePath
        } 

        if ($isValidPath) {
            return $gamePath
        }
        else {
            return $null
        }        
    }
}