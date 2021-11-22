const { userServices } = require("../services");

module.exports = {

    Query: {
        users: () => userServices.index(),
        user: (_,{id}, context) => userServices.show(id, context)
    },

    Mutation: {
        update: (_, {id, email}, context) => userServices.update(id, email, context)

    }

}