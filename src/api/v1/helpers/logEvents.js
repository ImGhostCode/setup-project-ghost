const path = require('path')

const fs = require('fs').promises

const fileName = path.join(__dirname, '../logs', 'logs.log')

const logEvents = async (message) => {
    const content = `${message}\n`
    try {
        fs.appendFile(fileName, content)
    } catch (error) {
        console.log(error)
    }
}

module.exports = logEvents