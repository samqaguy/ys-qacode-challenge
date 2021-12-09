#!/bin/sh
echo Installing Packages
npm install --production=false

echo Running Jest API Tests..
./node_modules/.bin/jest -t='.*\bAPI\b' --where=local --runInBand
