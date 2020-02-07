const db = require('../db/connect.js');

module.exports = (req,res)=>{
    db.query(`select * from posts order by id desc`, (error, posts, fields)=>{
        console.log(posts);
        res.send({posts});
    });
};