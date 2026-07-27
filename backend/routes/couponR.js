import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import { getCoupon, validateCoupon } from '../controllers/couponC.js';

const router = express.Router();

router.get("/", protectRoute, getCoupon);
router.post("/validate", protectRoute, validateCoupon);

export default router;
