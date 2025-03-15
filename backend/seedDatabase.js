require('dotenv').config()
const { Product } = require('./models/product');
const productList= require('./data/products.json');
const Review = require('./models/review');

const seedingDatabase=async()=>{
    const count= await Product.countDocuments();
    if (count===0){
        await Product.insertMany(productList);
    }
}

module.exports={seedingDatabase}