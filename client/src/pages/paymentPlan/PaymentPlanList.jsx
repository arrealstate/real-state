import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentPlanList = () => {
  const [paymentPlans, setPaymentPlans] = useState([]);

  useEffect(() => {
    async function fetchPaymentPlans() {
      try {
        const response = await axios.get('/api/paymentPlan/payment-plans'); 
        setPaymentPlans(response.data);
      } catch (error) {
        console.error('Error fetching payment plans:', error);
      }
    }

    fetchPaymentPlans();
  }, []);

  return (
    <div>
      <h2>Payment Plans</h2>
      <ul>
        {paymentPlans.map((plan) => (
          <li key={plan._id}>
            {plan.name} - {plan.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentPlanList;
