# One-time: sign in to GitHub as aroojnewcode, then push main.
# Run: powershell -ExecutionPolicy Bypass -File D:\buyaion2cheats-net\scripts\connect-github-arooj.ps1

$ErrorActionPreference = 'Stop'
$root = 'D:\buyaion2cheats-net'
Set-Location $root

New-Item -ItemType Directory -Force -Path 'D:\temp' | Out-Null
$env:TEMP = 'D:\temp'
$env:TMP = 'D:\temp'

Write-Host "`n=== Remote arooj ===" -ForegroundColor Cyan
git remote get-url arooj 2>$null
if ($LASTEXITCODE -ne 0) {
  git remote add arooj 'https://github.com/aroojnewcode/buyaion2-cheats-.net.git'
}

Write-Host "`n=== Clear cached GitHub login (wrong account: uroojroziroti-svg) ===" -ForegroundColor Cyan
$targets = @(
  'git:https://github.com',
  'https://github.com',
  'https://github.com/'
)
foreach ($t in $targets) {
  "protocol=https`nhost=github.com`n" | git credential reject 2>$null
}

Write-Host "`n=== Sign in to GitHub (pick account: aroojnewcode) ===" -ForegroundColor Cyan
$gcm = Get-Command git-credential-manager -ErrorAction SilentlyContinue
if ($gcm) {
  & git-credential-manager github login
} else {
  Write-Host "Git Credential Manager not found. On push, use:" -ForegroundColor Yellow
  Write-Host "  Username: aroojnewcode"
  Write-Host "  Password: a Personal Access Token from https://github.com/settings/tokens (repo scope)"
}

Write-Host "`n=== Push main ===" -ForegroundColor Cyan
git push -u arooj main
if ($LASTEXITCODE -eq 0) {
  Write-Host "`nDone. See https://github.com/aroojnewcode/buyaion2-cheats-.net" -ForegroundColor Green
} else {
  Write-Host "`nPush failed. Sign in as aroojnewcode (not uroojroziroti-svg) and run this script again." -ForegroundColor Red
  exit 1
}
