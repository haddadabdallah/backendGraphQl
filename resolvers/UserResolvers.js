const { userServices } = require("../services");

module.exports = {

    Query: {
        users: () => userServices.index(),
        user: (_,{id}, context) => userServices.show(id, context)
    },

    Mutation: {
        update: (_, body, context) => userServices.update(body, context)

    }

}