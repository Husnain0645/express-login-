const express = require ('express');
var bodyParser = require('body-parser');
// const db = require('./database/index');
const User = require("./models/user");
const res = require('express/lib/response');
const userRouter = require('./routes/userroutes');
const protectedroute = require('./routes/protectedroute');
const req = require('express/lib/request');
const cookieParser=require('cookie-parser');
require("dotenv").config();

const app =express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


    // app.post('/signup' , async (req , res , next) => {

    //     const newuser = await User.create(req.body);
    //     res.status(201).json({
    //         status : "success" ,
    //         data : newuser
    //     });
    
    // });
    app.get('/' ,(req, res)=>{
        res.status(500).json({ message: "Index" });
    })
    app.use('/', userRouter);
    app.use('/', protectedroute);
    app.use(cookieParser())

// app.get('/' , (req , res ) => {
//  res.status(200)
//  .send( `hello world `);
// });

const port =process.env.port || 3000;
app.listen(port , ()=>{
    console.log(`hello from ${port}`);
});