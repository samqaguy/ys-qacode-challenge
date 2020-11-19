// const { Severity } = require('jest-allure/dist/Reporter')
const util = require('util')
const fs = require('fs')
const writeFile = util.promisify(fs.writeFile)
var moment = require('moment')
var driver;
jest.setTimeout(35000)
let testStatus = false
const basePage = require('../uipageutils/basepage')
const basepage = new basePage()
const loginpage = require('../uipageutils/loginpage');
const commonFunc = require('../common/common.js');
const assert = require('assert')
const common = new commonFunc()
exports.ENV = require('minimist')(process.argv.slice(2))['where']
var numItems;

async function takeScreenshot(driveR, file) {
    let image = await driveR.takeScreenshot()
    await writeFile(file, image, 'base64')
    return image
}

beforeAll(async () => {
    await basepage.launchDriver('gc', exports.ENV)
    loginpage.initLoginPageElements()
})

afterAll(async () => {
    await basepage.quit()

})

afterEach(async () => {
await basepage.captureScreenShot()
})

describe('Saucedemo UI Tests', () => {
    const testuser = common.readConfig().testuser
    const testaccess = common.readConfig().testaccess
    it('Should be able to launch Saucedemo', async () => {
         expect(await loginpage.isLaunched()).toBeTruthy()
    })
    it('Should be able to login to Saucedemo', async () => {
        await loginpage.login(testuser, testaccess)
    })
    it('Should be able to find all items on products page containing "T-Shirt" and Add to cart', async () => {
       numItems =  await loginpage.findItemsAddtoCart("T-Shirt")
    })

    it('Should be able to click cart and validate "T-Shirt" on cart', async () => {
        const inCart = await loginpage.clickValidateCart("T-Shirt")
        assert.equal(numItems, inCart)
     })

     it('Should be able to checkout cart, fill form and continue', async () => {
       await loginpage.checkoutForm('sam', 'qaguy', '11385')
     })

     it('Should be able to validate cart, and finish purchase', async () => {
        const finalTxt = await loginpage.finishPurchase("T-Shirt", numItems)
        expect(finalTxt.includes("THANK YOU")).toBeTruthy()
      })


})