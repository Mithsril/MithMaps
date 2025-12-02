class SemVer : IComparable {
    [int]$Major
    [int]$Minor
    [int]$Patch
    [string]$Label

    SemVer([string]$version) {
        # https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
        $pattern = '^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)(?:-(?<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?<buildmetadata>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$'
        $match = [System.Text.RegularExpressions.Regex]::Match($version, $pattern)

        if ($match.Success) {
            $this.Major = [int]$match.Groups["major"].Value
            $this.Minor = [int]$match.Groups["minor"].Value
            $this.Patch = [int]$match.Groups["patch"].Value
            $this.Label = $match.Groups["prerelease"].Value
        }
        else {
            throw "Invalid version format"
        }
    }

    SemVer([int]$major, [int]$minor, [int]$patch, [string]$label) {
        $this.Major = $major
        $this.Minor = $minor
        $this.Patch = $patch
        $this.Label = $label
    }

    [string]ToString() {
        if ($this.Label) {
            return "$($this.Major).$($this.Minor).$($this.Patch)-$($this.Label)"
        }
        else {
            return "$($this.Major).$($this.Minor).$($this.Patch)"
        }
    }

    [int]CompareTo($other) {
        if ($other -is [string]) {
            $other = [SemVer]::new($other)
        }
        elseif ($other -isnot [SemVer]) {
            throw "Invalid comparison type"
        }

        # Compare major, minor, and patch versions
        $majorComparison = $this.Major.CompareTo($other.Major)
        if ($majorComparison -ne 0) {
            return $majorComparison
        }

        $minorComparison = $this.Minor.CompareTo($other.Minor)
        if ($minorComparison -ne 0) {
            return $minorComparison
        }

        $patchComparison = $this.Patch.CompareTo($other.Patch)
        if ($patchComparison -ne 0) {
            return $patchComparison
        }

        # Handle pre-release versions
        if ("" -eq $this.Label -and "" -eq $other.Label) {
            return 0
        }
        elseif ("" -eq $this.Label) {
            return 1
        }
        elseif ("" -eq $other.Label) {
            return -1
        }
        else {
            return Compare-AxiNaturalSort $this.Label $other.Label
        }

        throw "Invalid comparison"
    }
}
