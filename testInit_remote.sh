#!/bin/sh
echo Installing Packages
npm install

echo Running Jest API and UI Tests.. UI Tests will be triggered remotely on LambdaTest cloud
jest --where=remote --runInBand 
