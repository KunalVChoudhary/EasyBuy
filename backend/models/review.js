const {mongoose,Schema,model}=require('mongoose')


const reviewSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'user',required:true},
    productId:{type:Schema.Types.ObjectId,ref:'product',required:true},
    rating:{type:Number,max:5,min:1,required:true},
    comment:{type:String},
    createdAt:{type:Date,default:Date.now}
})

const Review=model('review',reviewSchema)

module.exports=Review