import {body} from "express-validator";

export const registerValidator=[
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({min:8}).withMessage('Password must be at least 8 characters')
];

export const loginValidator=[
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({min:8}).withMessage('Password must be at least 8 characters')
];

export const transactionValidator=[
    body('amount').notEmpty().isFloat({min:0}).withMessage('Amount must be a positive number'),
    body('type').notEmpty().isIn(['expense','income']).withMessage('Type must be income or expense'),
    body('category').notEmpty().isString().withMessage('Category must be a string'),
    body('date').optional().isDate().withMessage('Please enter a valid date'),
    body('description').optional().isString().isLength({max:300}).withMessage('Description cannot exceed 300 words'),
];