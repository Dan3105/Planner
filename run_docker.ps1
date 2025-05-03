# Navigate to the directory of the current script
Set-Location $PSScriptRoot

# Run Docker Compose using the specific YAML file
docker compose -f docker/docker_compose.yaml up