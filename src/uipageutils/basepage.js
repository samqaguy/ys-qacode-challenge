"use strict";
const os = require('os');
const moment = require('moment')
const util = require('util')
const fs = require('fs');
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const { Builder, By, Key, until } = require('selenium-webdriver')
require('chromedriver')
var driver;
const configFilePath = process.cwd() + '/resources/testconfig.json'
const objectRepoFilePath = process.cwd() + '/resources/objectrepository.json'
const screenShotFolderPath = process.cwd() + '/resources/screenshots/';
var screenshotname;
const commonFunc = require('../common/common.js');
const common = new commonFunc()
const assert = require('assert')


class BasePage {
    constructor() {

    }
    // launches driver either locally or on lambdatest cloud
    async launchDriver(browser, server) {
        try {
            let username = common.readConfig().cusername
            let accessKey = common.readConfig().acckey
            let suturl = common.readConfig().appurl
            switch (server) {
                case 'remote':
                    try {
                        const capabilities = {
                            build: 'ys-ui-saucetest',
                            browserName: 'chrome',
                            version: '86',
                            platform: 'WIN10',
                            video: true,
                            network: true,
                            console: true,
                            visual: true,
                            resolution : '1280x800'

                        }

                        driver = new Builder()
                            .usingServer(
                                'https://' + username + ':' + accessKey + '@hub.lambdatest.com/wd/hub'
                            )
                            .withCapabilities(capabilities)
                            .build()
                        await driver.manage().window().maximize();
                        await driver.get(suturl)
                    } catch (error) {
                        console.log('Error launching remote driver: ' + error.name + error.message + error.stack)
                    }
                    break

                case 'local':
                    try {
                        driver = await new Builder().forBrowser('chrome').build();
                        await driver.manage().window().maximize();
                        await driver.get(suturl)
                    } catch (error) {
                        console.log('Error launching local driver: ' + error.name + error.message + error.stack)

                    }
            }

        } catch (err) {
            console.log(
                'Error launching driver: ' + err.name + err.message + err.stack
            )
        }


    }

    // quits driver
    async quit() {
        try {
            driver.quit()
        } catch (err) {
            console.log(
                'Error quitting driver: ' + err.name + err.message + err.stack
            )
        }
    }
    // sleep function
    async sleep(time) {
        try {
            await driver.sleep(time);
        } catch (err) {
            console.log(err.name + err.message + err.stack);
        }
    }

    // selects element based on xpath
    async clickByXpath(element) {
        try {
            const el = await driver.findElement(By.xpath(element))
            await el.click()
            await driver.sleep(2000)
        } catch (err) {
            console.error(
                'Error in clickByXpath: ' + err.name + err.message + err.stack + element
            )
        }
    }

    // clicks an element
    async clickElement(element) {
        try {
            await element.click()
            await driver.sleep(2000)
        } catch (err) {
            console.error(
                'Error in clickElement: ' + err.name + err.message + err.stack + element
            )
        }
    }
    // writes into a field
    async write(element, text) {
        try {
            const el = await driver.findElement(By.xpath(element)).sendKeys(text)
        } catch (err) {
            console.log('Error in write: ' + err.name + err.message + err.stack + element)
        }
    }
    // isDisplayed?
    async isDisplayed(element) {
        try {
            const el = await driver.findElement(By.xpath(element))
            return await el.isDisplayed()
        } catch (err) {
            throw new Error("Unable to find element " + err.name + err.message + err.stack + element)
        }
    }

    // waits until an element is located
    async waitUntilElement(element, by) {
        try {
            return await driver.wait(until.elementLocated(By[by](element)), 10000)

        } catch (err) {
            throw new Error("Unable to locate element " + err.name + err.message + err.stack + element)


        }
    }
    // waits until elements are located
    async waitUntilElements(elements, by) {
        try {
            return await driver.wait(until.elementsLocated(By[by](elements)), 10000)

        } catch (err) {
            throw new Error("Unable to locate elements " + err.name + err.message + err.stack + element)


        }
    }
    // get text attribute of element
    async getText(element, by) {
        try {
            const el = await driver.findElement(By[by](element)).getText()
            return el

        } catch (err) {
            throw new Error("Unable to getText " + err.name + err.message + err.stack + element)

        }
    }
    // finds element by arguments passed
    async findElements(element, by) {
        try {
            const el = await driver.findElements(By[by](element))
            return el
        } catch (error) {
            throw new Error("Unable to find login elements " + err.name + err.message + err.stack + element)

        }
    }

    // reads object repository
    readObjectRepo() {
        try {
            var data = fs.readFileSync(objectRepoFilePath, 'utf8');
            var jsobj = JSON.parse(data);
            return jsobj;
        } catch (err) {
            console.log(err.name + err.message + err.stack);
        }
    }
    // performs screenshot action 
    async captureScreenShot() {
        try {
            var now = new moment();
            let image = await driver.takeScreenshot()
            screenshotname = screenShotFolderPath + now + '.png';
            await writeFile(screenshotname, image, 'base64')
        } catch (err) {
            console.log(err.name + err.message + err.stack);
        }
    }
}
module.exports = BasePage