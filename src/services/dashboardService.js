import Transaction from "../models/Transaction.js";

export const getTotals = async ()=>{
    const result=await Transaction.aggregate([
        {$match: {isDeleted: false}},
        {
            $group:{
                _id:'$type',
                total:{$sum:'$amount'}
            }
        }
    ]);

    const income=result.find(t=>t._id==='income')?.total || 0;
    const expense=result.find(t=>t._id==='expense')?.total || 0;

    return {
        totalIncome:income,
        totalExpense:expense,
        netBalance:income-expense
    };
};

export const getCategoryBreakdown=async ()=>{
    const result=await Transaction.aggregate([
        {$match:{isDeleted:false}},
        {
            $group:{
                _id:'$category',
                total:{
                    $sum:'$amount'
                }
            }
        },
        { $sort: { total: -1 } }
    ]);

    return result;

};

export const getMonthlyTrends= async ()=>{
    const result=await Transaction.aggregate([
        {$match:{isDeleted:false}},
        {
            $group:{
                _id:{
                    month:{$month:'$date'},
                    year:{$year:'$date'}
                },
                total:{
                    $sum:'$amount'
                }
            }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    return result;
};

export const getRecentActivity= async (limit=10)=>{
    const result=await Transaction.find({isDeleted:false}).sort({createdAt:-1}).limit(limit).populate('createdBy','name email');

    return result;
};