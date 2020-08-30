#!/bin/sh

set -e

npm run build
docker build . -f scripts/Dockerfile -t xieyuheng/dialogos-web
