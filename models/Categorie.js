const mongoose = require('mongoose')



const schema = {

    name: {
        type: String,
        require: true
    }, slug: {
        type: String,
        require: true
    }, status: {
        type: Boolean,
        require: true
    }

}



const CategoriseSchema = new mongoose.Schema(schema)

module.exports = mongoose.model('Categorie', CategoriseSchema);