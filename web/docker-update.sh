#!/bin/sh

# To exit the script on non-zero exit code.
set -e

docker stop dialogos
sh scripts/docker/docker-pull.sh
docker system prune --volumes --force
sh scripts/docker/docker-run.sh
