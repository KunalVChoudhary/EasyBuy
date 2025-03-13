const {Schema,model}=require('mongoose')

const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String},
    googleId:{type:String}
})

const User=model('user', userSchema);

module.exports={User}