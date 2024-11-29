require('dotenv').config();

const mariadb = require('mariadb');

const con = mariadb.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "C3poqap2p*741137a",
    database: process.env.DB_NAME || "crud",
    port: process.env.DB_PORT || "3308"
});

module.exports = con;
