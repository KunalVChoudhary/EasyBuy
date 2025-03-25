const {Router}=require('express');
const { Cart } = require('../models/cart');
const { User } = require('../models/user');
const { Product } = require('../models/product');
const route=Router();

route.get('/cart',async(req,res)=>{
    const user=await User.findOne({email:req.user.email})
    const userCart=await Cart.findOne({userId:user.id})
    return res.json(userCart.items)
})

route.post('/cart',async (req,res)=>{
    let {productId,quantity}=req.body;
    const user=await User.findOne({email:req.user.email})
    const userCart= await Cart.findOne({userId:user.id})
    const checkItemInCart= userCart.items.find(item=>item.productId==productId)
    if(!checkItemInCart){
        userCart.items=[...userCart.items,{productId,quantity}]
        await userCart.save()
        return res.status(200).json({message:'cart updated successfully'})}
    return res.status(400).json({message:'item already in cart'})
})

route.patch('/cart',async(req,res)=>{
    let {productId,quantity}=req.body;
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
    return res.status(400).json({message:'item not in cart'})
})

route.delete('/cart',async(req,res)=>{
    let {productId}=req.body
    const user=await User.findOne({email:req.user.email});
    const userCart= await Cart.findOne({userId:user.id})
    const checkItemInCart= userCart.items.find(item=>item.productId==productId)
    if (checkItemInCart){
        const updatedItemsList=userCart.items.filter((item)=>{item.productId!=productId})
        userCart.items=[...updatedItemsList]
        await userCart.save()
        return res.status(200).json({message:'item delete successfully'})}
    return res.status(400).json({message:'item not in cart'})  
})

module.exports=route;