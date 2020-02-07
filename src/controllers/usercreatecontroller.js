const db = require('../db/connect.js');

module.exports = (req,res)=>{
   let username = req.body.username
   let password = req.body.password
    console.log(username, '' , password)
    db.query(`insert into users (username, password) values ('${username}','${password}')`, (error,results,fields)=>{
        console.log(results)
        res.status(200).send({
            message: 'created',
            status: 'true'
        });
        res.end();
    });
}