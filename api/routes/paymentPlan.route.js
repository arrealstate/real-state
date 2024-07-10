import express from 'express';
import {
  getAllPaymentPlans,
  createPaymentPlan,
  deleteAllPaymentPlans,
} from '../controllers/paymentPlan.controller.js';

const router = express.Router();

// Route to get all payment plans
router.get('/payment-plans', getAllPaymentPlans);

// Route to create a new payment plan
router.post('/payment-plans', createPaymentPlan);

// Route to delete all payment plans
router.delete('/payment-plans', deleteAllPaymentPlans);

export default router;
