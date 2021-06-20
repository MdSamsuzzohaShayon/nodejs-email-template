const mysql = require('mysql');
const { HOST, USERNAME, PASSWORD, DBNAME, PORT } = process.env;
console.log();
const conn = mysql.createConnection({
    host: HOST,
    user: USERNAME,
    password: PASSWORD,
    database: DBNAME
}, { debug: true });


module.exports = conn;


