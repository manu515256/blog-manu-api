const express = require('express');
const app = express();
const session = require('express-session');
const PORT = 8090
const db = require('./db/connect.js'); 

db.connect((err)=>{
    if(err) throw err;
    console.log("Mysql Connected");
});
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.json());


// ENDPOINTS


app.post('/login', (req ,res)=>{
    let username = req.body.username
    let password = req.body.password

    if(username && password){
        db.query(`select * from users where username = '${username}' and password = '${password}' `, function(error, results, fields){
            console.log(results)
            if(results.length > 0){
                console.log("nice");
                req.session.loggedin = true;
                req.session.username = username;
                res.status(200).send("works")
            }else{
                res.status(401).send('Wrong username or password');
                console.log('denied');
            }
            res.end();
        })
    }else{
        console.log('empty credentials');
        res.status(401).send('');
        res.end();
    }
});


app.listen(PORT, () => {
    console.log('Server runing on: localhost:' + PORT);
});
