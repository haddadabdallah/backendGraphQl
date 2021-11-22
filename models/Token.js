const mongoose = require('mongoose')

const schema = {

    token: {
        type: String,
        require: true
    }, uid: {
        type: String,
        require: true
    }, status: {
        type: Boolean,
        default: true
    }

}



const TokenSchema = new mongoose.Schema(schema)

module.exports = mongoose.model('Token', TokenSchema);