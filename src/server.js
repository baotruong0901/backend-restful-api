require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const initWebRoutes = require('./routes/web')
const connection = require('./config/dbConnect')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 8088
const hostname = process.env.HOST_NAME

configViewEngine(app)
initWebRoutes(app)

//config req.body
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


//‘self running’ function.
(async () => {
    try {
        await connection();
        app.listen(port, () => {
            console.log(`Backend Nodejs is Running on the port: ${port}`)
        })
    } catch (error) {
        console.log("Error connect to DB: ", error);
    }
})()   
