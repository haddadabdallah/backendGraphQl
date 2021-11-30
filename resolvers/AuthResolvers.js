
const { authServices } = require('../services')




module.exports = {



    Query: {
        users: () => []
    },

    Mutation: {
        signup: (_, { email, password }) => authServices.signup(email, password),
        login: (_, { email, password }) => authServices.login(email, password),
        checkAuth: (_, body ,context) => authServices.checkAuth(body, context)
    }

}