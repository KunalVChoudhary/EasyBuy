const {mongoose,Schema,model}=require('mongoose')

const cartSchema=new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items:[{
        productId:{
            type:Schema.Types.ObjectId,
            ref:'Product'},
        quantity:Number
    }],
    createdAt:{type:Date,default:Date.now}
})

const Cart=model('cart',cartSchema)

module.exports={Cart}