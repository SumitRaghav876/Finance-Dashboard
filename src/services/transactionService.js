import Transaction from "../models/Transaction.js";

export const createTransaction=async ({amount,type,category,date,description,createdBy})=>{
    const transaction=await Transaction.create({
        amount,
        type,
        category,
        date,
        description,
        createdBy
    });

    return transaction;
};

export const getTransactions=async (userId)=>{
    const transactions=await Transaction.find({
        createdBy:userId,
        isDeleted:false
    });

    return transactions;
};

export const getTransactionById=async (id)=>{
    const transaction=await Transaction.findById(id);
    if (!transaction || transaction.isDeleted) {
        throw new Error('Transaction not found!');
    }
    return transaction;
};

export const updateTransaction=async (id,updates)=>{
    const transaction=await Transaction.findByIdAndUpdate(id,{ $set: updates },{ returnDocument: 'after' });

    if (!transaction) throw new Error('Transaction not found!');
    return transaction;
};

export const deleteTransaction=async (id)=>{
    const transaction=await Transaction.findByIdAndUpdate(id,
        {isDeleted:true},
        { returnDocument: 'after' }
    );
    if (!transaction) throw new Error('Transaction not found!');
    return transaction;
};