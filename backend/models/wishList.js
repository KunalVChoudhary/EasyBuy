const {Schema,model}=require('mongoose')

const wishListSchema=new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    items:[
        {
        type:Schema.Types.ObjectId,
        ref:'product'}
        ]
},{timestamps:true})

const WishList=model('wishList',wishListSchema)

module.exports={WishList}