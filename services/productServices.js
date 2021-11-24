const Product = require("../models/Product")
const Categorie = require("../models/Categorie")


const index = async ({ page = 1, categorie = "" }) => {

    try {

        let query = {}

        if(categorie){

            const categorie_ = await Categorie.findOne({slug: categorie })

            if(categorie_){
                query = {...query, categorie : categorie_._id }
            }else{

            }
           
        }

        const result = await Product.find().limit(2).skip(2 * (page - 1)).populate('categorie')

        if (result.length) {

            return {
                code: 200,
                success: true,
                message: "sucsses",
                products: result
            }


        } else {


            return {
                code: 404,
                success: false,
                message: "product not found",
                products: []
            }


        }

    } catch (error) {

        return {
            code: 500,
            success: false,
            message: error.message,
            products: []
        }


    }

}


const show = async (id, { auth, user }) => {


    try {

        const result = await Product.findOne({ _id: id }).populate('categorie')

        if (result) {

            return {
                code: 200,
                success: true,
                message: "sucsses",
                product: result
            }

        } else {

            return {
                code: 404,
                success: false,
                message: "product not found",
                products: []
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


const store = async (body, { auth, user }) => {

    try {

        if (auth) {

            const product = new Product(body)

            const result = await product.save()



            if (result) {

                const allProduct = await Product.find()

                return {
                    code: 200,
                    success: true,
                    message: "sucsses",
                    products: allProduct
                }


            } else {

                return {
                    code: 404,
                    success: false,
                    message: "product not added",
                    products: []
                }

            }
        } else {
            return {
                code: 401,
                success: false,
                message: "user not auth",
                products: []
            }
        }

    } catch (error) {

        return {
            code: 500,
            success: false,
            message: error.message,
            products: []
        }

    }

}


const update = async (body, { auth, user }) => {

    try {

        if (auth) {



            const result = await Product.findByIdAndUpdate({ _id: body.id }, body, { new: true })

            if (result) {


                const allProduct = await Product.find()

                return {
                    code: 200,
                    success: true,
                    message: "sucsses",
                    products: allProduct
                }

            } else {
                return {
                    code: 404,
                    success: false,
                    message: "product not updated",
                    products: []
                }


            }

        } else {

            return {
                code: 401,
                success: false,
                message: "user not auth",
                products: []
            }

        }

    } catch (error) {


        return {
            code: 500,
            success: false,
            message: error.message,
            products: []
        }

    }

}


const remove = async (id, { auth, user }) => {

    try {

        if (auth) {

            const result = await Product.findByIdAndRemove(id)

            if (result) {

                const allProduct = await Product.find()

                return {
                    code: 200,
                    success: true,
                    message: "sucsses",
                    products: allProduct
                }

            } else {

                return {
                    code: 404,
                    success: false,
                    message: "product not deleted",
                    products: []
                }

            }


        } else {

            return {
                code: 401,
                success: false,
                message: "user not auth",
                products: []
            }

        }

    } catch (error) {

        return {
            code: 500,
            success: false,
            message: error.message,
            products: []
        }

    }

}


module.exports = productServices = {
    index,
    show,
    store,
    update,
    remove
}