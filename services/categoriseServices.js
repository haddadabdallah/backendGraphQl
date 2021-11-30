const Categorie = require("../models/Categorie")
const { response } = require('../helper/response');


const allResource = async () => {

    const allCategories = await Categorie.find()

    return allCategories

}

const index = async () => {

    try {

        const reslut = await Categorie.find()

        if (reslut.length) {

            return response.success(reslut)

        } else {

            return response.notFound()

        }

    } catch (error) {

        return response.unexpected(error)

    }

}


const sotre = async (body, { auth, user }) => {

    try {



        const categorise = new Categorie(body)
        const result = await categorise.save()

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



        const result = await Categorie.findByIdAndUpdate({ _id: body.id }, body, { new: true })

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


        const result = await Categorie.findByIdAndDelete({ _id: id })

        if (result) {

            return response.success(await allResource())

        } else {

            throw Error('Bad Request')

        }




    } catch (error) {

        return response.unexpected(error)

    }

}


module.exports = categorisesServices = {
    index,
    sotre,
    update,
    remove
}