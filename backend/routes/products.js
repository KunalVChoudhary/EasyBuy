const {Router}=require('express');
const { Product } = require('../models/product');

const route=Router()

route.get('/product/:productId',async (req,res)=>{ 
     try
        {const productId=req.params.productId; //_id of product object in mongodb
            const product =await Product.findById({_id:productId});
            res.status(200).json({product})
        }
    catch(err){
        console.log(err);
        res.status(400).json({err})
    }

})

module.exports=route