import React from 'react';

const RazorpayButton = ({
  buttonText = 'Pay Now',
  buttonClass = '',
  paymentDetails 
}) => {
  // Dynamically load the Razorpay script
  React.useEffect(() => {
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

    try {
      // 1. Create an order by calling your backend API
      const orderResponse = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: paymentDetails.amount, // Amount in currency subunits
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const order = await orderResponse.json();

      // 2. Configure Razorpay options using details from props and the created order
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
          address: "Your Corporate Office Address"
        },
        theme: {
          color: paymentDetails.theme.color,
        },
      };

      // 3. Open the Razorpay payment window
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("There was an error processing your payment. Please try again.");
    }
  };

  return (
    <button className={buttonClass} onClick={displayRazorpay}>
      {buttonText}
    </button>
  );
};

export default RazorpayButton;