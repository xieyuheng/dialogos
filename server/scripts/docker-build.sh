#!/bin/sh

set -e

docker build . \
       --file scripts/Dockerfile \
       --tag xieyuheng/dialogos-server
