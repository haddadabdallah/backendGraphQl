const { categoriseServices } = require("../services");
const middlewares = require('../helper/authMiddlewares')



module.exports = {

    Query: {
        categorises: () => categoriseServices.index()
    },

    Mutation: {
        addCategorie: (_, body, context) => middlewares.isAuth(context, categoriseServices.sotre(body, context)),
        updateCategorie: (_, body, context) => middlewares.isAuth(context, categoriseServices.update(body, context)),
        removeCategorie: (_, { id }, context) => middlewares.isAuth(context, categoriseServices.remove(id, context))
    }

}