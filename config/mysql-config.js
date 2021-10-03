const mysql = require('mysql');
const { HOST, USERNAME, PASSWORD, DBNAME } = process.env;
console.log();
const conn = mysql.createPool({
    host: HOST,
    user: USERNAME,
    password: PASSWORD,
    database: DBNAME,
    multipleStatements: true
}, { debug: true });

conn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('Db is connected - One Plus One is: ', results[0].solution);
});


module.exports = conn;


