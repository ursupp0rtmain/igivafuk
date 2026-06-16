$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

if (-not (Select-String -Path package.json -Pattern 'publish:cli' -Quiet)) {
  Write-Error "Run this script from the igivafuk repository root."
  exit 1
}

if (-not $env:NODE_AUTH_TOKEN) {
  $ghToken = gh auth token 2>$null
  if ($LASTEXITCODE -eq 0 -and $ghToken) {
    $env:NODE_AUTH_TOKEN = $ghToken
  } else {
    Write-Host "Set NODE_AUTH_TOKEN to a GitHub token with write:packages, or run: gh auth login"
    exit 1
  }
}

npm config set @ursupp0rtmain:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken $env:NODE_AUTH_TOKEN

npm run publish:cli
