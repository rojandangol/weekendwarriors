const mysql = require('mysql');
require('dotenv').config();

const db_port = process.env.PORT;
const db = process.env.DB;
const db_host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const connection = mysql.createConnection({
    host: `${db_host}`,
    user: `${user}`, // will be replaced
    password: `${password}`, // will be replaced
    database: `${db}`, // will be replaced
    port: `${db_port}`
});

connection.connect((err)=>{
    if (err){
        console.error('Error, could not connect to database:',err);
        return;
    }
    console.log('Connection Successful! Debugging' , {db_port});
});

module.exports = connection;