#!/bin/sh

set -e

sh scripts/docker-build.sh
docker push xieyuheng/dialogos-server
