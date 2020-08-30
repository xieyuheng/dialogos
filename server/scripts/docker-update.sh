#!/bin/sh

set -e

docker stop dialogos-server
docker pull xieyuheng/dialogos-server
docker system prune --volumes --force
docker run --name dialogos-server -d -p 3000:3000 xieyuheng/dialogos-server
