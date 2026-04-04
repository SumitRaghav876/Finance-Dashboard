import mongoose from "mongoose";
import hashedPassword from "../utils/passwordPlugin.js";


const transSchema=new mongoose.Schema({
    amount:{
        type:Number,
        required:[true,'amount is required']
    },
    type:{
        type:String,
        enum:['income','expense'],
        default:'income'
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    description:{
        type:String,
        trim:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: [true, 'CreatedBy is required']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps:true});

transSchema.plugin(hashedPassword);

const Transaction=mongoose.model('Transaction',transSchema);

export default Transaction;