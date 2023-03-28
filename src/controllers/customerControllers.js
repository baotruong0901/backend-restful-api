const apiService = require("../services/apiService")
const fileService = require("../services/fileService")


module.exports = {

    postCreateCustomer: async (req, res) => {
        try {
            let image = ""
            if (req.files || Object.keys(req.files).length > 0) {
                let imageFile = await fileService.uploadSingleFile(req.files.image);
                image = imageFile.path
            }
            let { name, email, phone, address, description } = req.body
            let data = { name, email, phone, address, description, image }
            let result = await apiService.createCustomer(data)
            return res.status(200).json(result)
        } catch (error) {
            console.log(error);
        }
    },
    postCreateArrayCustomer: async (req, res) => {
        try {
            let array = req.body.customer
            let data = await apiService.createArrayCustomer(array)
            return res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    },
    getCustomers: async (req, res) => {
        try {
            let { limit, page } = req.query
            let data = null
            if (limit && page) {
                data = await apiService.getCustomers(limit, page, req.query)
            }
            else {
                data = await apiService.getCustomers()
            }

            return res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    },
    putUpdateCustomer: async (req, res) => {
        try {
            let data = await apiService.updateCustomer(req.body)
            return res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    },
    deleteCustomer: async (req, res) => {
        try {
            let id = req.body.id
            let data = await apiService.deleteCustomer(id)
            return res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    },
    deleteArrayCustomer: async (req, res) => {
        try {
            let arrayId = req.body.customerId
            console.log(arrayId);
            let data = await apiService.deleteArrayCustomers(arrayId)
            return res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    },
}