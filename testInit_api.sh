#!/bin/sh
echo Installing Packages
npm install

echo Running Jest API Tests..
./node_modules/.bin/jest -t='.*\bAPI\b' --where=local --runInBand
