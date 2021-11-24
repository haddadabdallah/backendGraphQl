const { productServices } = require("../services");

module.exports = {

    Query: {
        products: (_,body) => productServices.index(body),
        product:  (_,{id}, context) => productServices.show(id, context)
    },

    Mutation: {
        addProduct: (_, body, context) => productServices.store(body, context),
        updateProduct: (_, body, context) => productServices.update(body, context),
        deleteProduct: (_, {id}, context) => productServices.remove(id, context)
    }

}