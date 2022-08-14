require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST_KEY);
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cors());

console.log('here')

app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;

  const customer = await stripe.customers.create();

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Purchase from My Shop",
      payment_method: id,
      confirm: true,
      customer: customer.id,
    })
    
    res.json({
      message: "Payment Successful",
      success: true
    })
  } catch (error) {
    console.log("Error", error)
    res.json({
      message: "Payment Failed",
      success: false
    })
  }
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`)
});