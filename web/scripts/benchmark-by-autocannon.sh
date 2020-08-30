#!/bin/sh

# To exit the script on non-zero exit code.
set -e

docker restart dialogos-web
autocannon -c 100 -d 5 http://localhost
autocannon -c 100 -d 5 http://localhost/principles-of-systems
autocannon -c 100 -d 5 http://localhost/the-little-typer
