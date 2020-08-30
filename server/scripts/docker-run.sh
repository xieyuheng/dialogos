#!/bin/sh

set -e

docker run --name dialogos-server -d -p 3000:3000 xieyuheng/dialogos-server
