import * as dashboardService from "../services/dashboardService.js";

export const getTotal=async(req,res)=>{
    try{
        const result=await dashboardService.getTotals();
        res.status(200).json({status:'success',data:result});
    }
    catch(err){
        res.status(400).json({ success: false, msg: err.message });
    }
};

export const categoryBreakDown=async(req,res)=>{
    try{
        const category=await dashboardService.getCategoryBreakdown();
        res.status(200).json({status:'success',data:category});
    }
    catch(err){
        res.status(400).json({success:false,msg:err.name});
    }
};

export const monthlyTrends=async(req,res)=>{
    try{
        const monthTrend=await dashboardService.getMonthlyTrends();
        res.status(200).json({status:'success',data:monthTrend});
    }
    catch(err){
        res.status(400).json({success:false,msg:err.message});
    }
};

export const recentActivities=async(req,res)=>{
    try{
        const recentActivity=await dashboardService.getRecentActivity();
        res.status(200).json({status:'success',data:recentActivity});
    }
    catch(err){
        res.status(400).json({success:false,err:err.message});
    }
};