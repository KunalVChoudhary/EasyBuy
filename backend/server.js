require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const {seedingDatabase}= require('./seedDatabase.js')

const app=express();
console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    seedingDatabase();
    console.log('MongoDB connected from server');})

const PORT = process.env.PORT;

app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.listen(PORT,()=>{console.log('Server Started');})