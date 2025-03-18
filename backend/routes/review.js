const {Router}=require('express');
const Review = require('../models/review');
const { Product } = require('../models/product');
const { User } = require('../models/user')

const route=Router()

route.post('/review/:productId',async(req,res)=>{
    try {
    const productId=req.params.productId;
    const product=await Product.findOne({productId})
    const userId=req.user.id;
    const {rating,comment}=req.body;
    await Review.create({
        userId,
        productId:product.id,
        comment,
        rating
    })
    return res.status(200).json({message:"review posted successfully"})}
    catch(err){
        return res.status(400).json({message:"Couldn't post the review"})
    }
})

route.get('/review/:productId',async (req,res)=>{
    try {const productId=req.params.productId;
    const product=await Product.findOne({productId})   
    const reviews=await Review.find({productId:product.id})
    .populate('userId','name email')
    .sort({createdAt:-1})
    const averageRating=reviews.length ? ((reviews.reduce((sum,review)=> sum+review.rating,0)/reviews.length).toFixed(1)):0
    return res.status(200).json({reviews,averageRating})}
    catch(err){
        return res.status(400).json({message:"Couldn't get the reviews"})
    }
})

route.put('/review/:reviewId',async (req,res)=>{
    try{
        const reviewId=req.params.reviewId;
        const {rating,comment}=req.body;
        const review = await Review.findById({_id:reviewId})
        if (req.user.id !== review.userId.toString()) {
            return res.status(403).json({ message: "Unauthorized to update this review" });
        }
        review.rating=rating;
        review.comment=comment;
        await review.save()
        return res.status(200).json(review)
    }
    catch(err){
        return res.status(400).json({message:"Review updation unsuccessfull"})
    }
})

route.delete('/review/:reviewId',async(req,res)=>{
    try{
        const reviewId=req.params.reviewId;
        const review = await Review.findById({_id:reviewId})
        if (req.user.id !== review.userId.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this review" });
        }
        await review.deleteOne()    
        return res.status(200).json({review})}
    catch(err){
        return res.status(400).json({message:"Review deletion unsuccessfull"})
    }
})

module.exports=route