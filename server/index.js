const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');
dotenv.config();
const app= express();

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
    key_id: `${process.env.key_id}`,
    key_secret: `${process.env.key_secret}`
});
app.post('/create-order', async (req, res)=> {

    
    const options = {
        amount: req.body.amount, 
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: 1
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send(process.env.key_id,process.env.key_secret);
    }
})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});