const User = require('../models/User')
const { v1: uuidv1 } = require('uuid');
const crypto = require('crypto')
var jwt = require('jsonwebtoken');
const Token = require('../models/Token');

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
            return {
                email: result.email,
                password: result.password,
                status: true
            }
        } else {
            throw Error('non signup user')
        }


    } catch (error) {
        return {
            email: null,
            password: null,
            status: false
        }
    }

}

const login = async (email, password) => {

    try {

        const user = await User.findOne({ email: email })

        if (user) {

            const hashedPassword = createHashedPassword(user.salt, password)

            if (hashedPassword === user.password) {

                const token = jwt.sign({ id: user._id }, 'amakey');


                const isToken = await Token.findOne({ uid: user._id })

                if (isToken) {

                    const update = await Token.findOneAndUpdate({ uid: user._id }, { token: token })

                    return {
                        email: user.email,
                        token: token,
                        status: true
                    }


                } else {

                    const sessionToken = new Token({
                        token,
                        uid: user._id,
                        status: true
                    })

                    const result = await sessionToken.save()

                    return {
                        email: user.email,
                        token: token,
                        status: true
                    }


                }


            } else {
                return {
                    email: null,
                    token: null,
                    status: false
                }
            }

        }

    } catch (error) {
        return {
            email: null,
            token: null,
            status: false
        }
    }
}


const reset_password = async (email, token) => {

    

}

const authServices = {
    signup,
    login,
    reset_password
}

module.exports = authServices