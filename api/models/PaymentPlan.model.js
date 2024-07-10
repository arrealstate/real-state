import mongoose from 'mongoose';

const paymentPlanSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  downPayment: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  monthlyPercentage: {
    type: Number,
  },
  months: {
    type: Number,
  },
  directCompletionPercentage: {
    type: Number,
  },
});

const PaymentPlan = mongoose.model('PaymentPlan', paymentPlanSchema);

export default PaymentPlan;
