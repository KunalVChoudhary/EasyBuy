const {Router}=require('express');
const { Cart } = require('../models/cart');
const { User } = require('../models/user');
const { Product } = require('../models/product');
const route=Router();

route.get('/cart',async(req,res)=>{
    const userId=await User.findOne({email:req.user.email})
    const userCart=await Cart.findOne({userId})
    return res.json(userCart.items)
})

route.post('/cart',async (req,res)=>{
    let {productId,quantity}=req.body;
    const userId=await User.findOne({email:req.user.email})
    const userCart= await Cart.findOne({userId})
    for (let index = 0; index < userCart.items.length; index++) {
        const element = userCart.items[index];
        if (element.productId==productId){
            element.quantity=quantity
            if (quantity==0) userCart.items.splice(index,1)
            await userCart.save()
            return res.status(200).json({message:'cart updated successfully'})
        }
    }
    if (quantity!=0){
        userCart.items=[...userCart.items,{productId,quantity}]
        await userCart.save()}
    return res.status(200).json({message:'cart updated successfully'})
})

module.exports=route;