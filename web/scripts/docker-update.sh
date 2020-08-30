#!/bin/sh

# To exit the script on non-zero exit code.
set -e

docker stop dialogos-web
docker pull xieyuheng/dialogos-web
docker system prune --volumes --force
docker run --name dialogos-web -d -p 80:80 xieyuheng/dialogos-web
