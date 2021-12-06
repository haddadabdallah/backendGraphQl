const { mode } = require('../config')

// return response 

const json = (status = true, code = 200, message = "", data) => {

    return {
        code: code,
        status: status,
        message: message,
        data: data
    }
    
}


const success = (data) => {
    
    return {
        code: 200,
        status: true,
        message: "Success",
        data: data
    }

}


const notFound = () => {

    return {
        code: 404,
        status: false,
        message: "The requested resource was not found",
        data: []
    }

}


// return arror response Unauthorized if user not auth

const unauthorized = () => {

    return {
        code: 401,
        status: false,
        message: "Authentication is required to access the resource.",
        data: null
    }

}

// return error message in developpement and unexpected error in production

const forbidden = () => {

    return {
        code: 403,
        status: false,
        message: "Access to that resource is forbidden",
        data: null
    }

}


const unexpected = (error) => {

    return {
        code: 500,
        status: false,
        message: mode === "developpement" ? error.message : " unexpected error ",
        data: null
    }

}




exports.response = {
    json,
    success,
    notFound,
    unauthorized,
    unexpected,
    forbidden
}