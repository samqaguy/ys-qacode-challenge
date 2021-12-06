#!/bin/sh
echo Installing Packages
npm install

echo Running Jest API and UI Tests.. UI Tests will be triggered locally on google chrome
jest -t='.*\bAPI\b' --where=local --runInBand