const express = require('express');
const app = express();
const session = require('express-session');
const PORT = 8090
const db = require('./db/connect.js'); 

const createPost = require('./controllers/newpostcontroller.js');
const readPost = require('./controllers/readpostcontroller.js');
const userLogin = require('./controllers/userlogincontroller.js');
const deletePost = require('./controllers/deletepostcontroller.js');
const userCreate = require('./controllers/usercreatecontroller.js');
const updatePost = require('./controllers/updatepostcontroller.js');

//Start db
db.connect((err)=>{
    if(err) throw err;
    console.log("Mysql Connected");
});

// Middleware
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.urlencoded({
    extended: false
}));
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

// ENDPOINTS
app.post('/user/create',userCreate);
app.post('/user/login', userLogin);
app.post('/post/new', createPost);
app.post('/post/update/:id',updatePost);
app.get('/post/read', readPost);
app.delete('/post/deletepost/:id', deletePost);


app.listen(PORT, () => {
    console.log(`Server runing on: localhost:${PORT}`);
});
