# ブログ ビルド & デプロイスクリプト
# 初回のみ: .cf_token ファイルにCloudflare APIトークンを入れておく

param(
    [string]$Message = "update blog"
)

$tokenFile = "$PSScriptRoot\.cf_token"

if (Test-Path $tokenFile) {
    $env:CLOUDFLARE_API_TOKEN = (Get-Content $tokenFile -Raw).Trim()
} elseif (-not $env:CLOUDFLARE_API_TOKEN) {
    Write-Host "Cloudflare API Tokenが設定されていません。" -ForegroundColor Red
    Write-Host '.cf_token ファイルにトークンを書いてください。' -ForegroundColor Yellow
    exit 1
}

$env:CLOUDFLARE_ACCOUNT_ID = "51f9164f86f50ab9b77e16b16184314c"

Write-Host ">>> ビルド中..." -ForegroundColor Cyan
npx astro build
if ($LASTEXITCODE -ne 0) { Write-Host "ビルド失敗" -ForegroundColor Red; exit 1 }

Write-Host ">>> デプロイ中..." -ForegroundColor Cyan
npx wrangler pages deploy dist --project-name investment-blog --commit-message $Message --commit-dirty=true
if ($LASTEXITCODE -ne 0) { Write-Host "デプロイ失敗" -ForegroundColor Red; exit 1 }

Write-Host ">>> 完了! https://numasoko-value.com" -ForegroundColor Green
