import PaymentPlan from '../models/PaymentPlan.model.js';

// Controller function to get all payment plans
export const getAllPaymentPlans = async (req, res) => {
  try {
    const paymentPlans = await PaymentPlan.find();
    res.status(200).json(paymentPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to create a new payment plan
export const createPaymentPlan = async (req, res) => {
  const paymentPlan = new PaymentPlan(req.body);

  try {
    const newPaymentPlan = await paymentPlan.save();
    res.status(201).json(newPaymentPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to delete all payment plans
export const deleteAllPaymentPlans = async (req, res) => {
  try {
    await PaymentPlan.deleteMany({});
    res.status(200).json({ message: 'All payment plans deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
