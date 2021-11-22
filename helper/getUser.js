var jwt = require('jsonwebtoken');
const Token = require('../models/Token');


exports.getUser = async (token) => {

    try {

        const user = await jwt.verify(token, 'amakey');

        if (user) {

            const result = await Token.findOne({ token: token, status: true })

            if (result) {

                return user

            } else {

                return null

            }

        }

    } catch (error) {

        return null

    }

}