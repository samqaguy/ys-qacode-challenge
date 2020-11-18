const request = require('supertest')
const assert = require('assert')
// const Window = require('window')
// const window = new Window()
const commonFunc = require('../common/common.js')
const common = new commonFunc()

class RestApi {
    async getRequest(service, endpoint, status) {
        let res
        try {
            // reads json config for baseurl based on service arguments passed from test
            let serviceurl = common.readConfig().baseurls[service]

            // get request to the service and endpoint passed from test, also validates status code
            res = await request(serviceurl)
                .get(endpoint)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Accept', 'text/plain')
            assert.equal(res.status, status)
            return res
        }
        catch (err) {
            throw new Error('GET request failed with error:' + err.name + err.message + err.stack + 'Check request: ' + JSON.stringify(res))
        }

    }


    async postRequest(service, endpoint, payload) {
        //code block
    }
    async putRequest(service, endpoint, payload) {
        //code block
    }
    async delRequest(service, endpoint) {
        //code block
    }

}
module.exports = RestApi