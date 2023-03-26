require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const initWebRoutes = require('./routes/web')
const connection = require('./config/dbConnect')
const app = express()
const port = process.env.PORT || 8088
const hostname = process.env.HOST_NAME

configViewEngine(app)
initWebRoutes(app)



// simple query
connection.query(
    'SELECT * FROM  Users u',
    function (err, results, fields) {
        console.log(">>>results:", results); // results contains rows returned by server
    }
);

app.listen(port, () => {
    console.log(`Backend Nodejs is Running on the port: ${port}`)
})