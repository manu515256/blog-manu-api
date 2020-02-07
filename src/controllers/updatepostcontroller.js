const db = require('../db/connect.js');

module.exports = (req,res)=>{
    const id = req.params.id;
    let title = req.body.title
    let body = req.body.body
    db.query(`update posts set title='${title}', body='${body}' where id = ${id}`,(error,results,fields)=>{
        console.log(results);
        res.status(200).send({
            message: 'Post Updated!',
            status: true
        });
        res.end();
    });
}