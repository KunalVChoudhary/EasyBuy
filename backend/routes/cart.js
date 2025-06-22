const {Router}=require('express');
const { Cart } = require('../models/cart');
const { User } = require('../models/user');
const { Product } = require('../models/product');
const route=Router();

route.get('/cart',async(req,res)=>{
    try{const user=await User.findOne({email:req.user.email})
    const userCart=await Cart.findOne({userId:user.id}).populate('items.productId');
    return res.status(200).json(userCart.items)}
    catch{
        return res.status(401).json({message:'Please Login before accessing cart'})
    }
})

route.get('/cart/len',async(req,res)=>{
    try{const user=await User.findOne({email:req.user.email})
    const userCart=await Cart.findOne({userId:user.id})
    return res.status(200).json(userCart.items.length)}
    catch{
        return res.status(401)
    }
})

route.post('/cart',async (req,res)=>{
    try{let {productId,quantity}=req.body;
    const user=await User.findOne({email:req.user.email})
    const userCart= await Cart.findOne({userId:user.id})
    const checkItemInCart= userCart.items.find(item=>item.productId==productId)
    if(!checkItemInCart){
        userCart.items=[...userCart.items,{productId,quantity}]
        await userCart.save()
        return res.status(200).json({message:'Cart updated successfully'})}
    return res.status(400).json({message:'Item already in cart'})}
    catch(err){
        return res.status(401).json({message:'Please Login before accessing cart'})
    }
})

route.patch('/cart',async(req,res)=>{
    try{let {productId,quantity}=req.body;
    const user=await User.findOne({email:req.user.email});
    const userCart= await Cart.findOne({userId:user.id})
    for (let index = 0; index < userCart.items.length; index++) {
        const element = userCart.items[index];
        if (element.productId==productId){
            element.quantity=quantity
            await userCart.save()
            return res.status(200).json({message:'cart updated successfully'})
        }
    }
    return res.status(400).json({message:'item not in cart'})}
    catch{
        return res.status(401).json({message:'Please Login before accessing cart'})
    }
})

route.delete('/cart',async(req,res)=>{
    try{let {productId}=req.body
    const user=await User.findOne({email:req.user.email});
    const userCart= await Cart.findOne({userId:user.id})
    const checkItemInCart= userCart.items.find(item=>item.productId==productId)
    if (checkItemInCart){
        const updatedItemsList=userCart.items.filter((item)=>{return item.productId!=productId})
        userCart.items=[...updatedItemsList]
        await userCart.save()
        return res.status(200).json({message:'item delete successfully'})}
    return res.status(400).json({message:'item not in cart'})}
    catch{
        return res.status(401).json({message:'Please Login before accessing cart'})
    }  
})

module.exports=route;