#!/bin/sh

set -e

docker run --name dialogos-web -d -p 80:5000 xieyuheng/dialogos-web
