$cmdkeyOutput = cmdkey /list
foreach ($line in $cmdkeyOutput) {
    if ($line -match "Target: (.*github.*)") {
        $target = $matches[1].Trim()
        $target = $target -replace "^LegacyGeneric:target=", ""
        Write-Host "Deleting credential: $target"
        cmdkey /delete:"$target"
    }
}
Write-Host "Done clearing GitHub credentials."
