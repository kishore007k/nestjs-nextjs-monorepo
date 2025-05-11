# Define Kafka base path and paths
$KafkaBase = "C:\kafka_2.13-4.0.0"
$KafkaBin = Join-Path $KafkaBase "bin\windows"
$KafkaConfig = Join-Path $KafkaBase "config\server.properties"
$KafkaLogsDir = Join-Path $KafkaBase "logs"

# Check if Kafka is already formatted
if (-Not (Test-Path (Join-Path $KafkaLogsDir "meta.properties"))) {
    Write-Host "Kafka not formatted yet. Proceeding to generate cluster ID and format..."

    # Generate Kafka Cluster ID
    $KafkaClusterId = & "$KafkaBin\kafka-storage.bat" random-uuid
    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrEmpty($KafkaClusterId)) {
        Write-Error "Failed to generate Kafka Cluster ID"
        exit 1
    }
    Write-Host "Generated Kafka Cluster ID: $KafkaClusterId"

    # Format Kafka storage
    & "$KafkaBin\kafka-storage.bat" format -t "$KafkaClusterId" -c "$KafkaConfig"
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Kafka storage formatting failed"
        exit 1
    }
} else {
    Write-Host "Kafka is already formatted. Skipping format step."
}

# Start Kafka server
Write-Host "Starting Kafka server..."
Start-Process "$KafkaBin\kafka-server-start.bat" -ArgumentList "`"$KafkaConfig`"" -NoNewWindow
