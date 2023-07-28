const express = require('express');
const path = require('path');
const bodypaser = require("body-parser");
const bodyParser = require('body-parser');
const session = require("express-session");
const { v4:uuidv4 } = require("uuid");

const router = require('./router');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodypaser.urlencoded({extended:true}))



app.set('view engine', 'ejs');
//load static assets
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assests', express.static(path.join(__dirname, 'public/assests')));

app.use(session({
    secret: uuidv4(),
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router);

//home route

app.get('/',(req,res)=>{
    res.render('base',{title: "User Profile"});
})

app.listen(port, ()=>{ console.log("Running on http://localhost:3000")})


