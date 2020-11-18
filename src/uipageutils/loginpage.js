const BasePage = require('./basepage')
const WebElement = require('selenium-webdriver')
const map = WebElement.promise.map
const assert = require('assert')
var elements;

class LoginPage extends BasePage {
    constructor() {
        super();
    }

    initLoginPageElements() {
        try {
            elements = this.readObjectRepo().loginpage;
        } catch (err) {
            console.log(err.name + err.message + err.stack);
        }

    }
    // checks if an element is displayed
    async isLaunched() {
        try {
            await this.sleep(2000)
            return await this.isDisplayed(elements.login)
        } catch (err) {
            throw new Error("Unable to find login element " + err.name + err.message + err.stack)

        }

    }
    // performs login actions 
    async login(usrname, pswrd) {
        try {

            await this.sleep(2000)
            await this.clickByXpath(elements.uname)
            await this.write(elements.uname, usrname)
            await this.clickByXpath(elements.pswrd)
            await this.write(elements.pswrd, pswrd)
            await this.clickByXpath(elements.login)
            await this.sleep(2000)
        } catch (err) {
            throw new Error("Login error" + err.name + err.message + err.stack)
        }
    }

    // finds items that are sent from test and adds them to cart, returns count of items found
    async findItemsAddtoCart(product) {
        try {
            const item = elements.tshirt.replace('$item', product)
            await this.sleep(2000)
            let products = await this.findElements(item, 'xpath')
            for (var i = 0; i < products.length; i++) {
                products = await this.findElements(item, 'xpath')
                await this.sleep(2000)
                await this.clickElement(products[i])
                await this.clickByXpath(elements.addcart)
                await this.clickByXpath(elements.back)
            }
            return products.length
        } catch (err) {
            throw new Error("findItems error" + err.name + err.message + err.stack + product)

        }
    }
    // clicks cart and validates item in cart, returns count of items in cart
    async clickValidateCart(product) {
        try {
            await this.waitUntilElement(elements.cart, 'xpath')
            await this.clickByXpath(elements.cart)
            const item = elements.tshirt.replace('$item', product)
            let products = await this.findElements(item, 'xpath')
            return products.length
        }
        catch (err) {
            throw new Error("validateCart error" + err.name + err.message + err.stack + product)

        }
    }

    // checkouts cart by filling in form 
    async checkoutForm(fname, lname, zip) {
        try {
            await this.waitUntilElement(elements.checkout, 'xpath')
            await this.clickByXpath(elements.checkout)
            await this.clickByXpath(elements.fname)
            await this.write(elements.fname, fname)
            await this.clickByXpath(elements.lname)
            await this.write(elements.lname, lname)
            await this.clickByXpath(elements.zip)
            await this.write(elements.zip, zip)
            await this.clickByXpath(elements.continue)
            await this.sleep(2000)

        } catch (error) {
            throw new Error("checkout error" + err.name + err.message + err.stack)

        }
    }

    // finishes purchase and validates products added and returns finishing text
    async finishPurchase(product, numItem) {
        try {
            const item = elements.tshirt.replace('$item', product)
            let products = await this.findElements(item, 'xpath')
            assert.equal(products.length, numItem)
            await this.clickByXpath(elements.finish)
            const txt = await this.getText(elements.done, 'xpath')
            console.log(txt)
            await this.sleep(5000)
            return txt
        } catch (err) {
            throw new Error("finishPurchase error" + err.name + err.message + err.stack)

        }
    }

}

module.exports = new LoginPage()