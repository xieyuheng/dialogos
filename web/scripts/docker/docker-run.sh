#!/bin/sh

# To exit the script on non-zero exit code.
set -e

docker run --name dialogos -d -p 80:80 xieyuheng:dialogos
