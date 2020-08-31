#!/bin/sh

set -e

docker build . \
       --file scripts/Dockerfile \
       --tag xieyuheng/dialogos-server:latest \
       --tag xieyuheng/dialogos-server:$(date +%Y-%m-%d-%H-%M-%S)
