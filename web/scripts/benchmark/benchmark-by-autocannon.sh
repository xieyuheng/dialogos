#!/bin/sh

# To exit the script on non-zero exit code.
set -e

docker restart dialogos
autocannon -c 100 -d 5 http://localhost
autocannon -c 100 -d 5 http://localhost/book/principles-of-systems
autocannon -c 100 -d 5 http://localhost/book/the-little-typer
