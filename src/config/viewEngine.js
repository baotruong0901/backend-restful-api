const path = require('path')
const express = require('express')

const configViewEngine = (app) => {
    //config static file:image/css/js
    app.use(express.static(path.join('/src', "public")))
    app.set("view engine", "ejs")
    app.set("views", path.join('/src', 'views'))
}

module.exports = configViewEngine