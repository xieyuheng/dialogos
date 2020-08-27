#!/bin/sh

# To exit the script on non-zero exit code.
set -e

docker build . -f scripts/docker/Dockerfile -t xieyuheng/dialogos
