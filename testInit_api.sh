#!/bin/sh
echo Installing Packages
npm install

echo Running Jest API Tests..
jest -t='.*\bAPI\b' --where=local --runInBand
