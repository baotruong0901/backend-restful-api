const express = require('express')
const homeControllers = require('../controllers/homeControllers')
const router = express.Router();
const initWebRoutes = (app) => {
    //router.Method('/route',handler)
    router.get('/', homeControllers.getHomePage)
    return app.use("/", router)
}

module.exports = initWebRoutes