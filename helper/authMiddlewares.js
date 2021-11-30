const { response } = require("./response");

const isAuth = (context, next) => {

    try {

        if (context.auth) {
            return next
        }

        return response.unauthorized()

    } catch (error) {

        return response.unauthorized()

    }

}

const isAdmin = (context, next) => {

    try {

        if (context.auth && context.role === 2) {

            return next
            
        }

        return response.forbidden()

    } catch (error) {

        return response.unexpected(error)

    }

}

const middlewares = {
    isAuth,
    isAdmin
}


module.exports = middlewares