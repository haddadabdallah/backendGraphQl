const { userServices } = require("../services");

const middlewares = require('../helper/authMiddlewares')

module.exports = {

    Query: {
        users: () => userServices.index(),
        user: (_, { id }, context) => middlewares.isAuth(context, userServices.show(id, context))
    },

    Mutation: {
        update: (_, body, context) => middlewares.isAuth(context, userServices.update(body, context))

    }

}