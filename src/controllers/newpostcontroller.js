const db = require('../db/connect.js');

module.exports = (req,res)=>{
    let title = req.body.title
    let body = req.body.body
    console.log(title, '' , body)
    db.query(`insert into posts (title, body) values ('${title}','${body}')`, (error,results,fields)=>{
        console.log(results)
        res.status(200).send({
            message: 'created',
            status: 'true'
        });
        res.end();
    });
};

