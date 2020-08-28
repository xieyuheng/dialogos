#!/bin/sh

# To exit the script on non-zero exit code.
set -e

docker stop dialogos
docker pull xieyuheng/dialogos
docker system prune --volumes --force
docker run --name dialogos -d -p 80:80 xieyuheng/dialogos
