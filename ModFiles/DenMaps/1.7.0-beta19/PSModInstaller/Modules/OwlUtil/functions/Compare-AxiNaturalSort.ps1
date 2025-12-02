Add-Type -TypeDefinition @"
    using System;
    using System.Collections;
    using System.Runtime.InteropServices;

    public class NaturalSortComparer : IComparer {
        [DllImport("shlwapi.dll", CharSet = CharSet.Unicode, ExactSpelling = true)]
        private static extern int StrCmpLogicalW(string x, string y);

        public int Compare(object x, object y) {
            return StrCmpLogicalW(x.ToString(), y.ToString());
        }
    }
"@

function Compare-AxiNaturalSort {
    [CmdletBinding()]
    param(
        [parameter(mandatory)]
        [string]$ThisString,
        [parameter(mandatory)]
        [string]$OtherString
    )

    process {
        $comparer = New-Object NaturalSortComparer
        return $comparer.Compare($ThisString, $OtherString)
    }
}
