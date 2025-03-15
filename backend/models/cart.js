const {Schema,model}=require('mongoose')

const cartSchema=new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    items:[{
        productId:{
            type:Schema.Types.ObjectId,
            ref:'product'},
        quantity:Number
    }],
    createdAt:{type:Date,default:Date.now}
})

const Cart=model('cart',cartSchema)

module.exports={Cart}