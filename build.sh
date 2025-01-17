#!/usr/bin/sh

cd frontend
bun run build
cd ..

export BACKEND_STATIC_CONTENT_HOLDER="backend/src/main/resources/META-INF/resources"
export FRONTEND_STATIC_CONTENT_HOLDER="frontend/dist/**"


rm -rf $BACKEND_STATIC_CONTENT_HOLDER
mkdir -p $BACKEND_STATIC_CONTENT_HOLDER
cp -r $FRONTEND_STATIC_CONTENT_HOLDER $BACKEND_STATIC_CONTENT_HOLDER

cd backend
bash copy_to_docker.sh
cd ..
