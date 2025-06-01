require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session=require('express-session')
const passport=require('passport')
const {seedingDatabase}= require('./seedDatabase.js');
const MongoStore = require('connect-mongo');
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
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(cookieParser('i am cookie-parser for easybuy'))

app.use(session({
    secret: 'i am easybuy session middleware',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:6000000,
        httpOnly:true
    },
    store:MongoStore.create({
        client: mongoose.connection.getClient(),
    })
}))

app.use(passport.initialize())
app.use(passport.session())


app.get('/',(req,res)=>{
    if (!req.isAuthenticated()) return res.status(401).json({ message: 'Not authorized' });
    return res.json({ message: `Welcome, ${req.user.name}!`, user: req.user });
})

app.get('/as',(req,res)=>{
    return res.json(req.user)
})
app.use('/',route1,route2,route3,route4)


const PORT = process.env.PORT;
app.listen(PORT,()=>{console.log('Server Started');})