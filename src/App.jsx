import { useState } from 'react'
import './App.css'

import RazorpayButton from './component/RazorpayButton.jsx'

function App() {
  const [count, setCount] = useState(0)
  const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const paymentDetails = {
    key: key,
    amount: "500000", // Amount is in currency subunits (e.g., 50000 for ₹500.00)
    currency: "INR",
    name: "yashh.demo",
    description: "Test Transaction",
    image: "https://example.com/your_logo.png",
    order_id: "order_QvMZ726gNnBCfh",
    callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
    prefill: {
      name: "#",
      email: "#",
      contact: "#",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  return (
    <>
    <RazorpayButton paymentDetails={paymentDetails}/>
    </>
  )
}

export default App
