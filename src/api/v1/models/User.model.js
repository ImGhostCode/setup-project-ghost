const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

module.exports = model('users', UserSchema)