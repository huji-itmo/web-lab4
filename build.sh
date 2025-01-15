#!/usr/bin/sh

cd frontend
bun run build
cd ..

mv backend/app/src/main/webapp/WEB-INF backend/app/src/main/WEB-INF
rm -rf backend/app/src/main/webapp/
mkdir -p backend/app/src/main/webapp/
mv backend/app/src/main/WEB-INF backend/app/src/main/webapp/WEB-INF

cp -r frontend/dist/** backend/app/src/main/webapp/

cd backend
gradle war
cd ..
cp backend/app/build/libs/*.war docker/deployments
