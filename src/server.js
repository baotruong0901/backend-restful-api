require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const initWebRoutes = require('./routes/web')
const connection = require('./config/dbConnect')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const app = express()
const port = process.env.PORT || 8088

// default options
app.use(fileUpload());

//config req.body
app.use(bodyParser.json({ limit: '50mb' })) // Used to parse JSON bodies
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); //Parse URL-encoded bodies

configViewEngine(app)
initWebRoutes(app);


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
