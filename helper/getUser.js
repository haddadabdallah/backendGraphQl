var jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const User = require('../models/User');


exports.getUser = async (token) => {

    try {

        const user = await jwt.verify(token, 'amakey');


        if (user) {

            const user_result = await User.findOne({_id: user.id })
            const result = await Token.findOne({ token: token, status: true })

            if (result) {

                return {
                    auth: true,
                    role: user_result.role,
                    user: user_result
                }

            } else {

                return {
                    auth: false,
                    role: null,
                    user: null
                }
            }

        }

    } catch (error) {

        return {
            auth: false,
            role: null,
            user: null
        }

    }

}