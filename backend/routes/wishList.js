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
        return res.status(400).json({message:"cannot find the wishList"})
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
        return res.status(200).json(wishList)
    }
    catch(err){
        return res.status(400).json({message:"couldnt add to wishList",error:err.message})
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
       return  res.status(400).json({message:"cannot find the wishList",error:err.message})
    }
})

module.exports=route;