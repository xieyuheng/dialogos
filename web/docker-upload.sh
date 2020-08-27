#!/bin/sh

# To exit the script on non-zero exit code.
set -e

npm run build
sh scripts/docker/docker-build.sh
sh scripts/docker/docker-push.sh
