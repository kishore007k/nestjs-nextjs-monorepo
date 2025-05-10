# Define Kafka base path and paths
$KafkaBase = "C:\kafka_2.13-4.0.0"
$KafkaBin = Join-Path $KafkaBase "bin\windows"
$KafkaConfig = Join-Path $KafkaBase "config\server.properties"

# Define Kafka log directory (as set in your server.properties)
$KafkaLogsDir = "C:\kafka_2.13-4.0.0\logs"  # <-- change this if your log.dirs is different

# Check if Kafka is already formatted
if (-Not (Test-Path "$KafkaLogsDir\meta.properties")) {
    Write-Host "Kafka not formatted yet. Proceeding to generate cluster ID and format..."

    # Generate Kafka Cluster ID (UUID)
    $KafkaClusterId = & "$KafkaBin\kafka-storage.bat" random-uuid
    Write-Host "Generated Kafka Cluster ID: $KafkaClusterId"

    # Format Kafka storage
    & "$KafkaBin\kafka-storage.bat" format -t "$KafkaClusterId" -c "$KafkaConfig"
} else {
    Write-Host "Kafka is already formatted. Skipping format step."
}

# Start Kafka server
Write-Host "Starting Kafka server..."
Start-Process "$KafkaBin\kafka-server-start.bat" -ArgumentList "`"$KafkaConfig`"" -NoNewWindow
