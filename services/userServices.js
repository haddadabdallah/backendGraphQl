const User = require('../models/User')

const index = async () => {

    const result = await User.find()

    if (result) {
        return result
    }

}

const show = async (id, { auth, user, role }) => {

    try {

        console.log(role);

        if (auth) {

            const result = await User.findOne({ _id: id })

            if (result) {

                return {
                    code: 200,
                    status: true,
                    message: 'Success',
                    user: result
                }

            } else {

                return {
                    code: 404,
                    status: true,
                    message: 'User not existe',
                    user: null
                }

            }

        } else {

            return {
                code: 401,
                status: false,
                message: 'User not Auth',
                user: null
            }


        }

    } catch (error) {

        return {
            code: 500,
            status: false,
            message: error.message,
            user: null
        }

    }

}


const update = async (body, { auth, user }) => {

    try {

        if (auth) {

            const result = await User.findByIdAndUpdate(body.id, body, { new: true })

            if (result) {

                return {
                    code: 200,
                    status: true,
                    message: 'Success',
                    user: result
                }

            } else {

                return {
                    code: 404,
                    status: true,
                    message: 'User not existe',
                    user: result
                }

            }

        } else {

            return {
                code: 401,
                status: false,
                message: "User not auth",
                user: null
            }

        }

    } catch (error) {

        return {
            code: 500,
            status: false,
            message: error.message,
            user: null
        }

    }

}


const userServices = {

    index,
    show,
    update
}

module.exports = userServices