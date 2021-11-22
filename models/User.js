const mongoose = require('mongoose')

const schema = {

    email: {
        type: String,
        require: true
    }, password: {
        type: String,
        require: true
    }, salt: {
        type: String,
        require: true
    },reset_password: {
        type: String,
        require: false
    }

}

const AuthSchema = new mongoose.Schema(schema)

module.exports = mongoose.model('User', AuthSchema);