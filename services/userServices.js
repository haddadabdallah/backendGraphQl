const { response } = require('../helper/response');
const User = require('../models/User')


// get all users 

const index = async () => {


    try {

        const result = await User.find()

        if (result) {

            return response.success(result)

        } else {
            return response.notFound()
        }

    } catch (error) {

        return response.unexpected(error)

    }


}

// get one user by id

const show = async (id, { auth, user, role }) => {

    try {

        if (auth) {

            const result = await User.findOne({ _id: id })

            if (result) {

                return response.success(result)


            } else {

                return response.notFound()



            }

        } else {

            return response.unauthorized()

        }

    } catch (error) {

        return response.unexpected(error)

    }

}


// update user by id

const update = async (body, { auth, user }) => {

    try {


        if (auth) {

            if (body.id !== user._id.toString()) {

                return response.forbidden()

            }

            const result = await User.findByIdAndUpdate(body.id, {
                email: body.email
            }, { new: true })

            if (result) {

                return response.success(result)

            } else {

                return response.notFound()

            }

        } else {

            return response.unauthorized()

        }



    } catch (error) {

        return response.unexpected(error)

    }

}


const userServices = {

    index,
    show,
    update
}

module.exports = userServices