#!/usr/bin/sh

bash build.sh
cd docker
docker compose up --build --force-recreate
