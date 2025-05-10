# List of variables to remove
$varsToRemove = @(
    "KAFKA_CLUSTER_ID",
    "KafkaBase",
    "KafkaBin",
    "KafkaConfig",
    "KafkaLogsDir"
)

foreach ($var in $varsToRemove) {
    if (Get-Variable -Name $var -Scope Global -ErrorAction SilentlyContinue) {
        Remove-Variable -Name $var -Scope Global
        Write-Host "Removed variable: $var"
    } else {
        Write-Host "Variable not found or already removed: $var"
    }
}
