#!/bin/sh

set -e

docker restart dialogos-server
autocannon -c 100 -d 5 http://localhost:3000
autocannon -c 100 -d 5 http://localhost:3000/principles-of-systems
autocannon -c 100 -d 5 http://localhost:3000/the-little-typer
