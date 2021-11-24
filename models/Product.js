const mongoose = require('mongoose')



const schema = {

    name: {
        type: String,
        require: true
    }, slug: {
        type: String,
        require: true
    }, prix: {
        type: String,
        require: true
    }, photo: {
        type: String,
        require: true
    }, categorie: {
        type:  mongoose.Types.ObjectId,
        ref: 'Categorie',
        require: true
    }

}


const productSchema = new mongoose.Schema(schema)

module.exports = mongoose.model('Product', productSchema);