# Quita el fondo crema (#F3EDE2) de los logos y los deja transparentes.
$ErrorActionPreference = "Stop"
$pairs = @(
  @{ in = "9 Logo.png";  out = "public/logos/logo-1.png" },
  @{ in = "10 Logo.png"; out = "public/logos/logo-2.png" },
  @{ in = "11 Logo.png"; out = "public/logos/logo-3.png" }
)
New-Item -ItemType Directory -Path "public/logos" -Force | Out-Null

foreach ($p in $pairs) {
  if (-not (Test-Path $p.in)) { Write-Host "No existe: $($p.in)"; continue }
  # colorkey: quita el crema con tolerancia y borde suave; escala a 1400px.
  ffmpeg -y -v error -i $p.in -vf "colorkey=0xF3EDE2:0.16:0.08,scale=1400:-1,format=rgba" $p.out
  $f = Get-Item $p.out
  Write-Host "$($p.out)  ->  $([math]::Round($f.Length/1KB,0)) KB"
}
Write-Host "Listo. Revisa public/logos/"
