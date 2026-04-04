import express from "express";
import { getTotal, categoryBreakDown, monthlyTrends, recentActivities } from "../controllers/dashboardController.js";
import protect from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

const router=express.Router();

router.get('/totals',protect,authorize('analyst','admin'),getTotal);
router.get('/categories',protect,authorize('analyst','admin'),categoryBreakDown);
router.get("/trends/monthly",protect,authorize('analyst','admin'),monthlyTrends);
router.get("/activity",protect,authorize('analyst','admin','viewer'),recentActivities);

export default router;