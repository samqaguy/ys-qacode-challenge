const util = require('util')
const fs = require('fs');
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const configFilePath = process.cwd() + '/resources/testconfig.json'

class CommonFunc
{
    readConfig() {
        try {
            // reads json config file and parses data
            var data = fs.readFileSync(configFilePath, 'utf8');
            var jsobj = JSON.parse(data);
            return jsobj;
        } catch (err) {
            console.log(err.name + err.message + err.stack);
        }
    }
}

module.exports = CommonFunc