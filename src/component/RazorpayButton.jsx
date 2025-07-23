import React, { useState, useEffect } from 'react';

const RazorpayButton = ({
  buttonText = 'Pay Now',
  buttonClass = 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition',
  paymentDetails,
}) => {
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const displayRazorpay = async (e) => {
    e.preventDefault();

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      const orderResponse = await fetch('https://create-order-payment.vercel.app/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: numericAmount * 100, 
        }),
      });

      if (!orderResponse.ok) throw new Error('Failed to create order');

      const order = await orderResponse.json();

      const options = {
        key: paymentDetails.key,
        amount: order.amount,
        currency: order.currency,
        name: paymentDetails.name,
        description: paymentDetails.description,
        image: paymentDetails.image,
        order_id: order.id,

        prefill: {
          name: paymentDetails.prefill.name,
          email: paymentDetails.prefill.email,
          contact: paymentDetails.prefill.contact,
        },
        notes: {
          address: "Your Corporate Office Address",
        },
        theme: {
          color: paymentDetails.theme.color,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("There was an error processing your payment. Please try again.");
    }
  };

  return (
    <form
      onSubmit={displayRazorpay}
      className="flex flex-col items-start gap-3 max-w-sm w-full"
    >
      <label className="text-sm font-medium text-gray-700">
        Enter Amount (INR)
      </label>
      <input
        type="number"
        min="1"
        step="any"
        placeholder="e.g. 199"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button type="submit" className={buttonClass}>
        {buttonText}
      </button>
    </form>
  );
};

export default RazorpayButton;
