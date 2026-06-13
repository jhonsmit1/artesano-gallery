# Extrae una secuencia de frames del video del cliente para el scroll-scrub
# del Hero (técnica tipo Apple: imágenes en canvas, sin decodificar video).
$ErrorActionPreference = "Stop"
$src = "WhatsApp Video 2026-06-12 at 10.58.06 AM.mp4"
$outDir = "public/hero-frames"

if (Test-Path $outDir) { Remove-Item "$outDir/*" -Force -ErrorAction SilentlyContinue }
New-Item -ItemType Directory -Path $outDir -Force | Out-Null

# ~5 fps sobre 28s = ~140 frames. Ancho 1920px (máximo del original) para que
# el zoom de acercamiento (1.45x) no pixele. q5 controla el peso.
ffmpeg -y -i $src -vf "fps=5,scale=1920:-2" -q:v 5 "$outDir/frame-%03d.jpg"

$frames = Get-ChildItem "$outDir/frame-*.jpg"
$total = ($frames | Measure-Object -Property Length -Sum).Sum
Write-Host "Frames: $($frames.Count)"
Write-Host "Peso total: $([math]::Round($total/1MB,2)) MB"
Write-Host "Promedio por frame: $([math]::Round($total/$frames.Count/1KB,1)) KB"
