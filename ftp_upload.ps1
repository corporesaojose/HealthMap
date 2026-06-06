# Script de Upload FTP - Corpore Training Gym
# Uso: .\ftp_upload.ps1 -FilePath "C:\caminho\do\arquivo.txt"
# Uso (pasta inteira): .\ftp_upload.ps1 -FolderPath "C:\caminho\da\pasta"

param(
    [string]$FilePath,
    [string]$FolderPath,
    [string]$RemoteSubFolder = ""
)

# Credenciais FTP
$ftpHost   = "193.203.181.201"
$ftpPort   = 21
$ftpUser   = "u446706325.dev.corporetraininggym.com.br"
$ftpPass   = "p2I2i+mpUn:/PPR;"
$ftpRoot   = "public_html"

function Upload-File {
    param(
        [string]$localFile,
        [string]$remotePath
    )

    $fileName  = Split-Path $localFile -Leaf
    $remoteUrl = "ftp://${ftpHost}:${ftpPort}/${remotePath}/${fileName}"

    Write-Host "Enviando: $fileName -> $remoteUrl" -ForegroundColor Cyan

    try {
        $request = [System.Net.FtpWebRequest]::Create($remoteUrl)
        $request.Method      = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $request.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
        $request.UseBinary   = $true
        $request.UsePassive  = $true
        $request.KeepAlive   = $false

        $fileBytes = [System.IO.File]::ReadAllBytes($localFile)
        $request.ContentLength = $fileBytes.Length

        $stream = $request.GetRequestStream()
        $stream.Write($fileBytes, 0, $fileBytes.Length)
        $stream.Close()

        $response = $request.GetResponse()
        Write-Host "OK: $fileName ($($response.StatusDescription.Trim()))" -ForegroundColor Green
        $response.Close()
    }
    catch {
        Write-Host "ERRO ao enviar $fileName`: $_" -ForegroundColor Red
    }
}

# Monta o caminho remoto
$remoteFolder = if ($RemoteSubFolder) { "$ftpRoot/$RemoteSubFolder" } else { $ftpRoot }

# Upload de arquivo único
if ($FilePath) {
    if (-not (Test-Path $FilePath)) {
        Write-Host "Arquivo nao encontrado: $FilePath" -ForegroundColor Red
        exit 1
    }
    Upload-File -localFile $FilePath -remotePath $remoteFolder
}
# Upload de pasta inteira
elseif ($FolderPath) {
    if (-not (Test-Path $FolderPath)) {
        Write-Host "Pasta nao encontrada: $FolderPath" -ForegroundColor Red
        exit 1
    }
    $files = Get-ChildItem -Path $FolderPath -File
    if ($files.Count -eq 0) {
        Write-Host "Nenhum arquivo encontrado em: $FolderPath" -ForegroundColor Yellow
        exit 0
    }
    Write-Host "Enviando $($files.Count) arquivo(s) para $remoteFolder..." -ForegroundColor Yellow
    foreach ($file in $files) {
        Upload-File -localFile $file.FullName -remotePath $remoteFolder
    }
    Write-Host "Concluido." -ForegroundColor Green
}
else {
    Write-Host @"
Uso:
  Arquivo unico:  .\ftp_upload.ps1 -FilePath "C:\arquivo.txt"
  Pasta inteira:  .\ftp_upload.ps1 -FolderPath "C:\pasta"
  Subpasta FTP:   .\ftp_upload.ps1 -FilePath "C:\arquivo.txt" -RemoteSubFolder "imagens"
"@ -ForegroundColor Yellow
}
