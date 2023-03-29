const express = require('express')
const apiControllers = require('../controllers/apiControllers')
const customerControllers = require('../controllers/customerControllers')
const projectControllers = require('../controllers/projectControllers')
const taskControllers = require('../controllers/taskControllers')

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

    router.post('/projects', projectControllers.postProjects)
    router.get('/projects', projectControllers.getProjects)
    router.delete('/projects', projectControllers.deleteProjects)
    router.put('/projects', projectControllers.updateProjects)

    router.post('/tasks', taskControllers.postCreateTask)
    router.get('/tasks', taskControllers.getTasks)
    router.delete('/tasks', taskControllers.deleteTasks)
    router.put('/tasks', taskControllers.updateTasks)




    return app.use("/api/", router)
}

module.exports = initWebRoutes