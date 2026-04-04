import mongoose from "mongoose";
import hashedPassword from "../utils/passwordPlugin.js";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength: 8,
        select:false
    },
    role:{
        type:String,
        enum:['admin','analyst','viewer'],
        default:'viewer'
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

userSchema.plugin(hashedPassword);

const User=mongoose.model('User',userSchema);

export default User;