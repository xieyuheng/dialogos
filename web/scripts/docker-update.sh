#!/bin/sh

set -e

docker stop dialogos-web
docker pull xieyuheng/dialogos-web
docker system prune --volumes --force
docker run --name dialogos-web -d -p 80:5000 xieyuheng/dialogos-web
