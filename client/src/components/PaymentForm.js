import React, {useState} from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Card, CardActions, CardContent, Button, Typography} from '@mui/material';
import PaymentSuccessFull from './PaymentSuccessFull';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from './storeSlice';
import axios from 'axios';
import '../styles/payment.css'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#495057",
      fontFamily: "inherit",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#6c757d",
      },
    },
    invalid: {
      color: "#dc3545",
      iconColor: "#dc3545",
    },
  },
};

function PaymentForm() {
  const { totalPrice } = useSelector((state) => state.store);
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })
    
    console.log('here')

    if (!error && totalPrice !== 0) {
      try {
        const {id} = paymentMethod;
        const response = await axios.post('http://localhost:8000/payment', {
          amount: totalPrice*100,
          id
        })

        if (response.data.success) {
          console.log("Successful Payment")
          dispatch(clearCart())
          setSuccess(true)
        }

      } catch (error) {
        console.log("Error", error)
      }
    } else {
      console.log(error.message)
    }
  }

  return (
    <div>
      {
        !success ?
        <div className='payment-div'>
          <Card 
            sx={{ maxWidth: 500 }} 
            className='payment-card'
          >
            <CardContent>
              <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                Complete Payment
              </Typography>
              <br />
              <CardElement options={CARD_ELEMENT_OPTIONS}/>
            </CardContent>
            <CardActions>
              <Button 
                variant="contained" 
                className='pay-button' 
                onClick={(e) => handleSubmit(e)}
              >
                Pay
              </Button>
            </CardActions>
          </Card>
        </div> 
        : 
        <PaymentSuccessFull />
      }
    </div>
  );
}

export default PaymentForm;