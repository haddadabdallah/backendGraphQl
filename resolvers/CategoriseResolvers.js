const { categoriseServices } = require("../services");




module.exports = {

    Query: {
        categorises: () => categoriseServices.index()
    },

    Mutation: {
        addCategorie: (_,body, context) => categoriseServices.sotre(body, context),
        updateCategorie: (_, body, context) => categoriseServices.update(body, context),
        removeCategorie: (_, {id}, context) => categoriseServices.remove(id, context)
    }

}