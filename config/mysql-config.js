const mysql = require('mysql');
const { HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, DEBUG } = process.env;

// console.log({env: process.env});

const new_dubeg = DEBUG.toUpperCase() === 'TRUE' ? true : false;



const conn = mysql.createPool({
    host: HOST,
    user: 'root',
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: 3306,
    multipleStatements: true
}, { debug: new_dubeg });

conn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('Db is connected - One Plus One is: ', results[0].solution);
});


module.exports = conn;


