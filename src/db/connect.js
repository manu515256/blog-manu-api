const mysql = require('mysql');

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"blogmanu",
    port: 3306
});

module.exports = db