import React, { useState } from 'react';
import axios from 'axios';

const PaymentPlanForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    downPayment: 0,
    discount: 0,
    monthlyPercentage: 0,
    months: 0,
    directCompletionPercentage: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/payment-plans', formData); // Update with your API endpoint
      // Optionally, you can handle success or navigate to another page
    } catch (error) {
      console.error('Error creating payment plan:', error);
    }
  };

  return (
    <div>
      <h2>Create Payment Plan</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </label>
        {/* Add other input fields */}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default PaymentPlanForm;
