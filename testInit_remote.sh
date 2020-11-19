#!/bin/sh
echo Installing Packages
npm install

echo Running Jest API & UI Tests.. UI Tests will be triggered locally on google chrome
jest --where=remote --runInBand 
