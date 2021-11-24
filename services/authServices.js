const User = require('../models/User')
const { v1: uuidv1 } = require('uuid');
const crypto = require('crypto')
var jwt = require('jsonwebtoken');
const Token = require('../models/Token');

const { JWT_KEY } = require('../config')

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
                code: 200,
                success: true,
                message: "sucsses",
                user: result
            }
            


        } else {
            return {
                code: 404,
                success: false,
                message: "user not added",
                user: null
            }
        }


    } catch (error) {
   
        return {
            code: 500,
            success: false,
            message: error.message,
            products: null
        }

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

                 
  
                    return {
                        code: 200,
                        success: true,
                        message: "sucsses",
                        user: {
                            id: user._id,
                            email: user.email,
                            token: token
                        }
                    }


                } else {

                    const sessionToken = new Token({
                        token,
                        uid: user._id,
                        status: true
                    })

                    const result = await sessionToken.save()

                    const userInfo = {...user, token: token}

                    return {
                        code: 200,
                        success: true,
                        message: "sucsses",
                        user: {
                            id: user._id,
                            email: user.email,
                            token: token
                        }
                    }


                }


            } else {
                return {
                    code: 404,
                    success: false,
                    message: "error auth user not found",
                    user: null
                }
            }

        }

    } catch (error) {
        
        return {
            code: 500,
            success: false,
            message: error.message,
            products: null
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