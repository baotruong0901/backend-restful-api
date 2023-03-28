const express = require('express')
const apiControllers = require('../controllers/apiControllers')
const customerControllers = require('../controllers/customerControllers')

const router = express.Router();
const initWebRoutes = (app) => {
    //router.Method('/route',handler)
    router.get('/users', apiControllers.getAllUser)
    router.post('/users', apiControllers.postCreateUser)
    router.put('/users', apiControllers.putUpdateUser)
    router.delete('/users', apiControllers.deleteUser)

    router.post('/file', apiControllers.postUploadSingleFile)
    router.post('/files', apiControllers.postUploadMultipleFiles)

    router.post('/customer', customerControllers.postCreateCustomer)
    router.post('/customers', customerControllers.postCreateArrayCustomer)
    router.get('/customers', customerControllers.getCustomers)
    router.put('/customers', customerControllers.putUpdateCustomer)
    router.delete('/customer', customerControllers.deleteCustomer)
    router.delete('/customers', customerControllers.deleteArrayCustomer)


    return app.use("/api/", router)
}

module.exports = initWebRoutes