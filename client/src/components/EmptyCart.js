import React from 'react';
import { Card, CardMedia, CardActions, CardContent, Button, Typography} from '@mui/material';
import '../styles/payment.css'
import empty from '../assets/empty.png'
import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div style={{
      textAlign: "center",
    }}>
      <Card 
        sx={{ maxWidth: 500 }} 
        className='payment-card'
      >
        <CardMedia
          component="img"
          image={empty}
          alt="Successful Payment"
          className='s-media'
        />
        <CardContent>
          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            Cart is empty
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/shop" className='pay-button'>
            <Button 
              variant="contained" 
            >
              Continue Shopping
            </Button>
          </Link>
        </CardActions>
      </Card>
      
    </div>
  );
}

export default EmptyCart;