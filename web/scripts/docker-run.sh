#!/bin/sh

set -e

docker run --name dialogos-web -d -p 80:80 xieyuheng/dialogos-web
