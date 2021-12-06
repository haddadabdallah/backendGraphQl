const Product = require("../models/Product")
const Categorie = require("../models/Categorie")
const { response } = require('../helper/response');
const User = require("../models/User");



const allResource = async () => {

    const allResource = await Product.find()

    return allResource

}



const index = async ({ page = 1, categorie = "", userId = "" }, { auth, user }) => {

    console.log(userId);

    try {


        let query = {}

        if (userId) {

            const getUserId = await User.findOne({ username: userId })

            if (getUserId) {
                query = { ...query, user: getUserId._id }
            }

        }

        if (categorie) {

            const categorie_ = await Categorie.findOne({ slug: categorie })

            if (categorie_) {
                query = { ...query, categorie: categorie_._id }
            }

        }

        const result = await Product.find(query).limit(10).skip(10 * (page - 1)).populate('categorie').populate('user')


        if (result.length) {

            return response.success(result)

        } else {

            return response.notFound()

        }

    } catch (error) {

        return response.unexpected(error)

    }

}


const show = async (id, { auth, user }) => {


    try {

        const result = await Product.findOne({ _id: id }).populate('categorie')

        if (result) {

            return response.success(result)

        } else {

            return response.notFound()

        }

    } catch (error) {

        return response.unexpected(error)

    }

}


const store = async (body, { auth, user }) => {

    try {

        const post = {
            name: body.name,
            user: user._id,
            content: body.content
        }

        const result = await Product.create(post)

        if (result) {

            return response.success(await allResource())

        } else {

            throw Error('Bad Request')

        }

    } catch (error) {

        return response.unexpected(error)

    }

}


const update = async (body, { auth, user }) => {

    try {



        const result = await Product.findByIdAndUpdate({ _id: body.id }, body, { new: true })

        if (result) {

            return response.success(await allResource())

        } else {

            throw Error('Bad Request')

        }


    } catch (error) {


        return response.unexpected(error)

    }

}


const remove = async (id, { auth, user }) => {

    try {

        const result = await Product.findByIdAndRemove(id)

        if (result) {

            return response.success(await allResource())


        } else {

            throw Error('Bad Request')

        }

    } catch (error) {

        return response.unexpected(error)

    }

}


module.exports = productServices = {
    index,
    show,
    store,
    update,
    remove
}