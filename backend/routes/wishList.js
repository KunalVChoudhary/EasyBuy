const {Router}=require('express')
const { WishList } = require('../models/wishList')
const {Types}=require('mongoose')

const route=Router()

route.get('/wishlist',async(req,res)=>{
    try{
        const wishList=await WishList.findOne({userId:req.user.id});
        return wishList? res.status(200).json(wishList.items) : res.status(200).json([])
    }
    catch(err){
        return res.status(401).json({message:"Please Login before accessing wishList"})
    }
})

route.post('/wishlist',async(req,res)=>{
    try{
        //const productId=new Types.ObjectId(req.body.productId); //static createFromTime() 
        const productId=req.body.productId
        const wishList=await WishList.findOneAndUpdate(
            {userId:req.user.id},
            {$addToSet:{items:productId}
        },{new:true,upsert:true})
        return res.status(200).json({message:"Item added to wishList"})
    }
    catch(err){
        return res.status(401).json({message:"Please Login before accessing wishList",error:err.message})
    }
})

route.delete('/wishlist',async(req,res)=>{
    try{
        const productId=req.body.productId;
        const wishList=await WishList.findOneAndUpdate({userId:req.user.id},{$pull:{items:productId}},{new:true});
        if (!wishList) {
            throw new Error("Wishlist not found");
        }
        return res.status(200).json(wishList);
    }
    catch(err){
       return  res.status(401).json({message:"Please Login before accessing wishList",error:err.message})
    }
})

module.exports=route;