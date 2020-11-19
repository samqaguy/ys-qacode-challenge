# ys-qacode-challenge
QA JS framework for Web &amp; API - ys code challenge

Solution has the following components:
Jest framework
Supertest & selenium WebDriver(local and LambdaTest cloud)
Jest-stare html & junit xml reports 
Html report is at ‘./reports/jest-stare/index.html’
Junit.xml is on root
Screenshots are at ‘./resources/screenshots’

Execution commands:
‘jest --where=local —runInBand’ - this will run all tests locally
‘jest -t='.*\bUI\b' -where=remote —runInBand' - this will run remote, all tests containing “UI” in describe block(test suite), flag ‘where’ can have either ‘local’ or ‘remote’ as values.
Use ‘testInit_local.sh’ to run tests locally, this will install packages and trigger tests on your local machine(google chrome)
Use ‘testInit_remote.sh’ to run tests on LambdaTest cloud, you can view results and screenshots after test run for validation.

Pre-requisites:
Node.js
Google Chrome version > 87 (latest)

Steps to run tests:
git clone https://github.com/samqaguy/ys-qacode-challenge.git
Run testInit_local.sh (or) testInit_remote.sh to run all api and web tests
View report at ‘./reports/jest-stare/index.html’
View screenshots at ‘./resources/screenshots’
