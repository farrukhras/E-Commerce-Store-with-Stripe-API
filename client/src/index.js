import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

// Stripe API integration
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const container = document.getElementById('root');
const root = createRoot(container);

const stripePromise = loadStripe('pk_test_51LV8jiSGPfkhjbEi8yRvdOiV9ej20lMtB3IYWs4QzWdkuIbPwTL62pNoo49a0FkTE93aikmePe9TlWBamdcZx6f600I9qtFPuP');

root.render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
