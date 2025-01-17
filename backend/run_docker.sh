#!/usr/bin/sh

bash copy_to_docker.sh

cd ../docker

docker compose up --build --force-recreate
