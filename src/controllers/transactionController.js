import * as transactionService from "../services/transactionService.js";

export const create=async (req,res)=>{
    try{
        const {amount,type,category,date,description}=req.body;
        const createdBy=req.user._id;

        const result=await transactionService.createTransaction({amount,type,category,date,description,createdBy});
        res.status(201).json({success:true,data:result});
    }
    catch(err){
        res.status(400).json({ success: false, msg: err.message });
    }
};

export const get=async (req,res)=>{
    try{
        const result=await transactionService.getTransactions(req.user._id);
        res.status(200).json({success:true,data:result});
    }
    catch(err){
        res.status(400).json({success:false,msg:err.message});
    }
};

export const getById=async (req,res)=>{
    try{
        const {id}=req.params;
        const result=await transactionService.getTransactionById(id);
        res.status(200).json({success:true,data:result});
    }
    catch(err){
        res.status(400).json({success:false,msg:err.message});
    }
};

export const update=async (req,res)=>{
    try{
        const {id}=req.params;
        const result=await transactionService.updateTransaction(id,req.body);
        res.status(200).json({success:true,data:result});
    }
    catch(err){
        res.status(400).json({success:false,msg:err.message});
    }
};

export const deleteTrans=async (req,res)=>{
    try{
        const {id}=req.params;
        await transactionService.deleteTransaction(id);
        res.status(200).json({success:true,message: 'Transaction deleted'});
    }
    catch(err){
        res.status(400).json({success:false,msg:err.message});
    }
};