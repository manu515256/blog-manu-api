const db = require('../db/connect.js');

module.exports = (req,res)=>{
    const id = req.params.id;
    db.query(`delete from posts where id = ${id}`,(error,results,fields)=>{
        console.log(results);
        res.status(200).send({
            message: 'Post Deleted',
            status: true
        });
        res.end();
    });
}