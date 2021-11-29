const Product = require("../models/Product")
const Categorie = require("../models/Categorie")
const { response } = require('../helper/response');



const allResource = async () => {

    const allResource = await Product.find()

    return allResource

}



const index = async ({ page = 1, categorie = "" }) => {

    try {

        let query = {}

        if (categorie) {

            const categorie_ = await Categorie.findOne({ slug: categorie })

            if (categorie_) {
                query = { ...query, categorie: categorie_._id }
            }

        }

        const result = await Product.find().limit(2).skip(2 * (page - 1)).populate('categorie')

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

        if (auth) {


            const result = await Product.findOne({ _id: id }).populate('categorie')

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


const store = async (body, { auth, user }) => {

    try {

        if (auth) {

            const result = await Product.create(body)

            if (result) {

                return response.success(await allResource())

            } else {

                throw Error('Bad Request')

            }


        } else {
            return response.unauthorized()
        }

    } catch (error) {

        return response.unexpected(error)

    }

}


const update = async (body, { auth, user }) => {

    try {

        if (auth) {

            const result = await Product.findByIdAndUpdate({ _id: body.id }, body, { new: true })

            if (result) {

                return response.success(await allResource())

            } else {

                throw Error('Bad Request')

            }

        } else {

            return response.unauthorized()
        }

    } catch (error) {


        return response.unexpected(error)

    }

}


const remove = async (id, { auth, user }) => {

    try {

        if (auth) {

            const result = await Product.findByIdAndRemove(id)

            if (result) {

                return response.success(await allResource())


            } else {

                throw Error('Bad Request')

            }


        } else {

            return response.unauthorized()

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