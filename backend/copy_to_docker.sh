#!/usr/bin/sh

./gradlew quarkusBuild

cd ..

rm -rf docker/build
cp -r backend/build docker/
