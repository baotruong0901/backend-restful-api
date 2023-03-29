require('dotenv').config()
const { MongoClient } = require('mongodb');

// Connection URL
const url = process.env.DB_HOST_WITH_DRIVER;
const client = new MongoClient(url);

// Database Name
const dbName = process.env.DB_NAME;

const connectionWithDriver = async () => {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('customers');

    // the following code examples can be pasted here...

    return 'done.';
}

module.exports = connectionWithDriver