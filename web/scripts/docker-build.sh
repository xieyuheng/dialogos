#!/bin/sh

set -e

npm run build
docker build . \
       --file scripts/Dockerfile \
       --tag xieyuheng/dialogos-web
