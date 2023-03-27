const connection = require('../config/dbConnect')

const getHomePage = (req, res) => {
    res.send("hello")
}

module.exports = {
    getHomePage
}