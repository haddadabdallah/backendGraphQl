const Categorie = require("../models/Categorie")


const index = async () => {

    return [{
        name: "abdallah",
        slug: "abdallah_web",
        status: true
    }]

}


const sotre = async (body, { auth, user }) => {

    try {

        if (auth) {

            const categorise = new Categorie(body)
            const result = await categorise.save()

            if (result) {

                const allCategories = await Categorie.find()
                console.log(allCategories);

                return {
                    code: 200,
                    success: true,
                    message: "sucsses",
                    categories: allCategories
                }

            } else {

                return {
                    code: 404,
                    success: true,
                    message: "not found",
                    categories: []
                }

            }

        } else {

            return {
                code: 401,
                success: false,
                message: "user not auth",
                categories: []
            }

        }

    } catch (error) {

        return {
            code: 500,
            success: false,
            message: error.message,
            categories: []
        }

    }

}


const update = async (body, { auth, user }) => {

    try {

        if (auth) {

            const result = await Categorie.findByIdAndUpdate({ _id: body.id }, body, { new: true })

            if (result) {

                const allCategories = await Categorie.find()

                return {
                    code: 200,
                    success: true,
                    message: "sucsses",
                    categories: allCategories
                }

            } else {
                return {
                    code: 404,
                    success: true,
                    message: "not found",
                    categories: []
                }
            }


        } else {

            return {
                code: 401,
                success: false,
                message: "user not auth",
                categories: []
            }

        }

    } catch (error) {

        return {
            code: 500,
            success: false,
            message: error.message,
            categories: []
        }


    }

}


const remove = async (id, { auth, user }) => {

    try {

        if (auth) {
            const result = await Categorie.findByIdAndDelete({ _id: id })

            if (result) {

                const allCategories = await Categorie.find()

                return {
                    code: 200,
                    success: true,
                    message: "sucsses",
                    categories: allCategories
                }


            } else {


                return {
                    code: 404,
                    success: true,
                    message: "not found",
                    categories: []
                }

            }

        } else {


            return {
                code: 401,
                success: false,
                message: "user not auth",
                categories: []
            }


        }


    } catch (error) {

        return {
            code: 500,
            success: false,
            message: error.message,
            categories: []
        }

    }

}


module.exports = categorisesServices = {
    index,
    sotre,
    update,
    remove
}