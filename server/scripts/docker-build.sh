#!/bin/sh

set -e

docker build . -f scripts/Dockerfile -t xieyuheng/dialogos-server
