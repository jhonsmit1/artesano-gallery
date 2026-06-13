# Optimiza el video del cliente para scroll-scrub (keyframes densos, sin audio).
# Objetivo: peso bajo (~10-12 MB desktop) manteniendo seeking fluido.
$ErrorActionPreference = "Stop"
$src = "WhatsApp Video 2026-06-12 at 10.58.06 AM.mp4"
$out = "public/videos"

# GOP corto (~0.33s a 30fps = 10 frames), sin audio, faststart.
$common = @(
  "-an",
  "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
  "-preset", "veryslow", "-g", "10", "-keyint_min", "10", "-sc_threshold", "0",
  "-movflags", "+faststart"
)

# Desktop 1440px de ancho (suficiente para un hero a pantalla completa).
ffmpeg -y -i $src -vf "scale=1440:-2" -crf 30 @common "$out/hero-desktop.mp4"
# Mobile 720px
ffmpeg -y -i $src -vf "scale=720:-2" -crf 31 @common "$out/hero-mobile.mp4"
# Poster: primer frame
ffmpeg -y -i $src -vframes 1 -q:v 4 "$out/hero-poster.jpg"

Write-Host "=== Resultados ==="
Get-ChildItem "$out/hero-*" | ForEach-Object {
  $mb = [math]::Round($_.Length/1MB, 2)
  Write-Host "$($_.Name)  ->  $mb MB"
}
