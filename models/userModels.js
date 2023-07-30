const { timeStamp } = require('console')
const mongoose=require('mongoose')
const userSchema=new mongoose.Schema(
    {
        name:{
            type: String,
            required:true
        },
        email:{
            type: String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        playlist:{
            type:Array,
            required:false
        },
        isAdmin:{
            type:Boolean,
            required:false,
            default: false,
        }
    },
    {timeStamp:true}
);
module.exports=mongoose.model('user',userSchema)