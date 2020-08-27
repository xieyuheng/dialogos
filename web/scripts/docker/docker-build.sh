#!/bin/sh
set -e

docker build . -f scripts/docker/Dockerfile -t xieyuheng/dialogos
echo "__________"
echo "you can run this example from your project root with"
echo "   docker run -d -p 80:80 xieyuheng:dialogos"
echo ""
