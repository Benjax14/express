const mysql = require('mysql2/promise');
const dotenv = require("dotenv");
dotenv.config();

async function connectBD() {
    try {
        
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: process.env.EXPRESS_DATASOURCE_PASS,
            database: process.env.EXPRESS_DATASOURCE_DB,
        });
        console.log("Connected to MySQL Database");

        return connection;
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}

module.exports = {
    connectBD
}