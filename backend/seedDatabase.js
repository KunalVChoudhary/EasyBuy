require('dotenv').config()
const { Product } = require('./models/product');
const productList= require('./data/products.json')

const seedingDatabase=async()=>{
    console.log('in seed');
    const count= await Product.countDocuments();
    if (count===0){
        await Product.insertMany(productList);
        console.log('Initialised the products collection');
    }
    else{
        console.log('DB already has products');
    }
}

module.exports={seedingDatabase}