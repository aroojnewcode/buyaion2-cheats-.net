# Start Astro dev with temp/cache on D: (avoids C: ENOSPC)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root
New-Item -ItemType Directory -Force -Path 'D:\temp', 'D:\npm-cache' | Out-Null
$env:TEMP = 'D:\temp'
$env:TMP = 'D:\temp'
$env:npm_config_cache = 'D:\npm-cache'
npm run dev
