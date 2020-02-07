const db = require('../db/connect.js');
const session = require('express-session');

module.exports = (req ,res)=>{
    let username = req.body.username
    let password = req.body.password

    if(username && password){
        db.query(`select * from users where username = '${username}' and password = '${password}' `, (error, results, fields)=>{
            console.log(results);
            if(results.length > 0){
                req.session.loggedin = true;
                req.session.username = username;
                res.status(200).send({
                    message:'Logged',
                    status:true
                });
                console.log("User Conected");
            }else{
                res.status(401).send({
                    message:'Wrong username or password',
                    status: false
                });
                console.log('denied');
            }
            res.end();
        })
    }else{
        console.log('empty credentials');
        res.status(401).send({
            status: false,
            message:'Empty fields'
        });
        res.end();
    }
};