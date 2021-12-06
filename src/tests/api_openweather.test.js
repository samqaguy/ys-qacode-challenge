const request = require('supertest')
const RestApi = require('../apiutils/api_methods.js')
const restapi = new RestApi()
const commonFunc = require('../common/common.js')
const common = new commonFunc()

beforeAll(async () => {
    // beforeAll() block
}
)

describe('GET request - weather API endpoint', () => {
    let res
    let service = 'openweathermap'
    let apikey = common.readConfig().keys[service]
    let invalidkey = common.readConfig().invalidkeys[service]


    it('should return 200 status on GET with city=London', async () => {
        try {
            res = await restapi.getRequest(service, 'weather?q=London,uk&appid=' + apikey, 200)
            // console.log("response is :" + JSON.stringify(res))
            expect(res.body).toHaveProperty('name', 'London')
        } catch (err) {
            throw new Error('Test failed with error:' + err.name + err.message + err.stack + 'Check request :' + JSON.stringify(res))
        }


    })
    it('should have city name=London in response', async () => {
        try {
            expect(res.body).toHaveProperty('name', 'London')
        } catch (err) {
            throw new Error('Test failed with error:' + err.name + err.message + err.stack + 'Check request :' + JSON.stringify(res))
        }


    })

    it('should return 401 status on GET with incorrect key', async () => {
        try {
            res = await restapi.getRequest(service, 'weather?q=London,uk&appid=' + invalidkey, 401)
        } catch (err) {
            throw new Error('Test failed with error:' + err.name + err.message + err.stack + 'Check request :' + JSON.stringify(res))
        }


    })
})