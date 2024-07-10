import React from "react";

const PaymentPlans = () => {
  const paymentPlans = [
    {
      plan: "Silver Plan",
      downpayment: "20% Down Payment (DP)",
      monthlyPayment: "50% During the project",
      completion: "30% upon Handover (HO)",
    },
    {
      plan: "Gold Plan",
      downpayment: "50% Down Payment (DP)",
      monthlyPayment: "20% During the project",
      completion: "30% upon Handover (HO)",
    },
    {
      plan: "Platinum Plan",
      downpayment: "Full Payment upfront",
      monthlyPayment: "",
      completion: "",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">BINGHATTI PHANTOM</h1>
      <p className="mb-4">
        <strong>NOTE:</strong> We have {paymentPlans.length} different payment
        plans.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentPlans.map((plan, index) => (
          <div key={index} className="bg-white border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{plan.plan}</h2>
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

      <div className="mt-8 p-4 text-red-700 font-bold text-xl rounded-xl">
        <p>Please use AR-15 to access these offers.</p>
      </div>
    </div>
  );
};

export default PaymentPlans;
