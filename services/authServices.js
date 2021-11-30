const User = require('../models/User')
const { v1: uuidv1 } = require('uuid');
const crypto = require('crypto')
var jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const { JWT_KEY } = require('../config')
const { response } = require('../helper/response');



const createHashedPassword = (salt, password) => {
    return hashedPassword = crypto
        .createHmac('sha1', salt)
        .update(password)
        .digest('hex');
}


const signup = async (email, password) => {

    try {

        const salt = uuidv1(password)
        const hashedPassword = createHashedPassword(salt, password)


        const auth = new User({ email, password: hashedPassword, salt: salt })
        const result = await auth.save()

        if (result) {

            const userResponse = {
                user: result
            }

            return response.success(userResponse)

        } else {

            throw Error("Bad Request")

        }


    } catch (error) {

        return response.unexpected(error)

    }

}

const login = async (email, password) => {

    try {

        const user = await User.findOne({ email: email })

        if (user) {

            const hashedPassword = createHashedPassword(user.salt, password)

            if (hashedPassword === user.password) {

                const token = jwt.sign({ id: user._id }, JWT_KEY);

                const isToken = await Token.findOne({ uid: user._id })

                if (isToken) {

                    const update = await Token.findOneAndUpdate({ uid: user._id }, { token: token })


                    return response.success({
                        user: {
                            id: user._id,
                            email: user.email,
                        },
                        token: token

                    })



                } else {

                    const sessionToken = new Token({
                        token,
                        uid: user._id,
                        status: true
                    })

                    const result = await sessionToken.save()


                    if (result) {

                        return response.success({
                            user: {
                                id: user._id,
                                email: user.email,
                            },
                            token: token


                        })

                    }

                }


            } else {

                throw Error("Bad Request")

            }

        }

    } catch (error) {

        return response.unexpected(error)
    }
}

const checkAuth = async (token, {auth, user}) => {


    if(auth){

        return response.success({
            user: {
                id: user._id,
                email: user.email,
            },
        })

    }else{

        return response.unauthorized()

    }
   



}

const reset_password = async (email, token) => {

}

const authServices = {
    signup,
    login,
    checkAuth,
    reset_password
}

module.exports = authServices