#!/bin/sh

set -e

npm run build
docker build . \
       --file scripts/Dockerfile \
       --tag xieyuheng/dialogos-web:latest \
       --tag xieyuheng/dialogos-web:$(date +%Y-%m-%d-%H-%M-%S)
