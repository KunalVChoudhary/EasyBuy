require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session=require('express-session')
const passport=require('passport')
const {seedingDatabase}= require('./seedDatabase.js');
const MongoStore = require('connect-mongo');
const route0 = require('./routes/products.js');
const route1 = require('./routes/authentication.js');
const route2 = require('./routes/cart.js')
const route3 = require('./routes/review.js')
const route4 = require('./routes/wishList.js')
const cookieParser = require('cookie-parser');
require('./strategies/googleOauth.js')
require('./strategies/localAuth.js')
const app=express();

//Mongoose Connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
    seedingDatabase();})

//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(cors({
  origin: [`${process.env.CLIENT_URL}`],
  credentials: true,
}));

app.use(cookieParser(`${process.env.COOKIE_SECRET}`))

app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    resave:false,
    saveUninitialized:false,
    cookie:{
        httpOnly: true,              
        secure: true,                
        sameSite: 'none',            
        domain: '.onrender.com',     
        path: '/',                   
        maxAge: 1000 * 60 * 60 * 24,
        priority: 'high'
    },
    store:MongoStore.create({
        client: mongoose.connection.getClient(),
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/',route0,route1,route2,route3,route4)


const PORT = process.env.PORT;
app.listen(PORT,()=>{console.log('Server Started');})