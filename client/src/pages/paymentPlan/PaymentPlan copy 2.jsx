// import React from 'react';
// import PaymentPlanList from './PaymentPlanList';
// import PaymentPlanForm from './PaymentPlanForm';

// const App = () => {
//   return (
//     <div>
//       <PaymentPlanList />
//       <PaymentPlanForm />
//     </div>
//   );
// };

// export default App;



import React from 'react';

const PaymentPlans = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">TAORMINA VILLAGE Townhouses</h1>
      <p className="text-lg mb-4">COMPLETION Q4 2027</p>
      <p className="mb-4">
        <strong>NOTE:</strong> We have 6 different payment plans.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentPlans.map((plan, index) => (
          <div key={index} className="bg-white border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">PLAN {index + 1}</h2>
            <p>
              <strong>{plan.downpayment}</strong>
            </p>
            <p>
              <strong>{plan.discount}</strong>
            </p>
            <p>
              <strong>{plan.monthlyPayment}</strong>
            </p>
            <p>
              <strong>{plan.completion}</strong>
            </p>
          </div>
        ))}
      </div>
       {/* bg-red-700 */}
        <div className="mt-8 p-4 text-red-700 font-bold text-xl rounded-xl">
        <p>Please use AR-20 to access these offers.</p>
      </div>
    </div>

  );
};

const paymentPlans = [
  {
    downpayment: '10% DOWNPAYMENT',
    discount: '5% DISCOUNT',
    monthlyPayment: '1% MONTHLY for 50 months',
    completion: '70% Directly on Completion',
  },
  {
    downpayment: '20% DOWNPAYMENT',
    discount: '10% DISCOUNT',
    monthlyPayment: '1% MONTHLY for 50 months',
    completion: '80% Directly on Completion',
  },
  {
    downpayment: '30% DOWNPAYMENT',
    discount: '15% DISCOUNT',
    monthlyPayment: '1% MONTHLY for 50 months',
    completion: 'Directly on Completion',
  },
  {
    downpayment: '30% DOWNPAYMENT',
    discount: '5% DISCOUNT',
    monthlyPayment: 'ZERO MONTHLY',
    completion: '70% Directly on Completion',
  },
  {
    downpayment: '20% DOWNPAYMENT',
    discount: '0% DISCOUNT',
    monthlyPayment: 'ZERO MONTHLY',
    completion: '80% Directly on Completion',
  },
  {
    downpayment: 'Full Cash in 6 months',
    discount: '40% DISCOUNT',
    monthlyPayment: '',
    completion: '',
  },
];

export default PaymentPlans;
