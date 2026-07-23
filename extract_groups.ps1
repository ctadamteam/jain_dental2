$json = Get-Content -Raw "figma_implant_parent.json" | ConvertFrom-Json
$children = $json.nodes.'223:4865'.document.children[0].children

function Get-Texts($node, $prefix) {
    if ($node.type -eq "TEXT") {
        Write-Output "$prefix$($node.characters)"
    }
    if ($node.children) {
        foreach ($child in $node.children) {
            Get-Texts $child $prefix
        }
    }
}

foreach ($child in $children) {
    Write-Output "=== GROUP: $($child.name) ==="
    Get-Texts $child "  "
}
