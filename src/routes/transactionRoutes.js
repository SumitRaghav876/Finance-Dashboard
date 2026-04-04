import express from "express";
import {create,get,getById,update,deleteTrans} from "../controllers/transactionController.js";
import protect from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";
import { transactionValidator } from "../middleware/validators.js";
import validate from "../middleware/validate.js";

const router=express.Router();

// all roles can view
router.get('/',protect,authorize('admin','analyst','viewer'),get);
router.get('/:id', protect, authorize('admin', 'analyst', 'viewer'), getById);

//only admin can create,update and delete
router.post('/',protect,authorize('admin'),transactionValidator,validate,create);
router.patch('/:id',protect,authorize('admin'),transactionValidator,validate,update);
router.delete('/:id',protect,authorize('admin'),transactionValidator,validate,deleteTrans);

export default router;