require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const initWebRoutes = require('./routes/web')
const app = express()
const port = process.env.PORT || 8088
const hostname = process.env.HOST_NAME

configViewEngine(app)
initWebRoutes(app)


app.listen(port, () => {
    console.log(`Backend Nodejs is Running on the port: ${port}`)
})