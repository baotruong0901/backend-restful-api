const connection = require('../config/dbConnect')

const getHomePage = (req, res) => {

    // simple query
    let users = []
    connection.query(
        'SELECT * FROM  Users u',
        function (err, results, fields) {
            users = results
            console.log(">>>results:", results); // results contains rows returned by server
            res.send(JSON.stringify(users))
        }
    );
}

module.exports = {
    getHomePage
}