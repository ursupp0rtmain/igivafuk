$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

if (-not (Select-String -Path package.json -Pattern 'publish:cli' -Quiet)) {
  Write-Error "Run this script from the igivafuk repository root."
  exit 1
}

npm whoami 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Not logged in to npm. Run: npm login"
  exit 1
}

npm run publish:cli
