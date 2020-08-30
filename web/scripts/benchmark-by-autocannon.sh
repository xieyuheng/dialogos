#!/bin/sh

set -e

docker restart dialogos-web
autocannon -c 100 -d 5 http://localhost
autocannon -c 100 -d 5 http://localhost/principles-of-systems
autocannon -c 100 -d 5 http://localhost/the-little-typer
