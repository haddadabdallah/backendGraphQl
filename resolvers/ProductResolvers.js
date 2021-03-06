const { response } = require("../helper/response");
const { productServices } = require("../services");
const middlewares = require('../helper/authMiddlewares')

module.exports = {

    Query: {
        products: (_, body, context) => middlewares.isAuth(context, productServices.index(body, context)) ,
        product: (_, { id }, context) => middlewares.isAuth(context, productServices.show(id, context))
    },

    Mutation: {
        addProduct: (_, body, context) => middlewares.isAuth(context, productServices.store(body, context)),
        updateProduct: (_, body, context) => middlewares.isAuth(context, productServices.update(body, context)),
        deleteProduct: (_, { id }, context) => middlewares.isAuth(context, productServices.remove(id, context))
    }

}