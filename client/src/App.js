import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ShopPage from './pages/ShopPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentForm from './components/PaymentForm';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route exact path="/shop" element={<ShopPage/>}/>
        <Route exact path="/checkout" element={<CheckoutPage/>}/>
        <Route exact path="/payment" element={<PaymentForm/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
