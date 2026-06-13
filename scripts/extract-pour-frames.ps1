# Extrae una secuencia de frames del video del "servido" para el scroll-scrub
# de la pantalla de bienvenida (mismo enfoque que el Hero: canvas + imágenes).
#
# USO:  powershell -ExecutionPolicy Bypass -File scripts/extract-pour-frames.ps1 "nombre-del-video.mp4"
$ErrorActionPreference = "Stop"

param(
  [string]$Src = ""
)

if (-not $Src -or -not (Test-Path $Src)) {
  Write-Host "Pasa la ruta del video. Ej:"
  Write-Host '  powershell -ExecutionPolicy Bypass -File scripts/extract-pour-frames.ps1 "pour.mp4"'
  exit 1
}

$outDir = "public/pour-frames"
if (Test-Path $outDir) { Remove-Item "$outDir/*" -Force -ErrorAction SilentlyContinue }
New-Item -ItemType Directory -Path $outDir -Force | Out-Null

# ~6 fps: suficientes frames para un scrubbing fluido sin pesar demasiado.
# Ancho 1000px, JPG q5. Ajusta fps según la duración del video.
ffmpeg -y -i $Src -vf "fps=6,scale=1000:-2" -q:v 5 "$outDir/frame-%03d.jpg"

$frames = Get-ChildItem "$outDir/frame-*.jpg"
$total = ($frames | Measure-Object -Property Length -Sum).Sum
Write-Host "Frames: $($frames.Count)"
Write-Host "Peso total: $([math]::Round($total/1MB,2)) MB"
Write-Host ""
Write-Host "Ahora dime el numero de frames ($($frames.Count)) para conectarlo en Story.tsx."
