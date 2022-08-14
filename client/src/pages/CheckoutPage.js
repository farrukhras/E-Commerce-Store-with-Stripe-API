import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { addItem, removeItem, clearItem } from '../components/storeSlice';
import '../styles/checkoutpage.css'

function CheckoutPage() {
  const { cartItems, totalPrice, totalCount } = useSelector((state) => state.store); 
  const dispatch = useDispatch();

  function handleRemoveItem(id) {
    dispatch(removeItem({"id": id}))
  }

  function handleAddItem(id) {
    dispatch(addItem({"id": id}))
  }

  function handleClearItem(id) {
    dispatch(clearItem({"id": id}))
  }

  return (
    <div>
      <h1 className='heading'>Checkout</h1>
      <div className='checkout-section'>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                cartItems.map((item)=> (
                   <TableRow key={item.id}>
                    <TableCell><img src={item.data.image} alt={item.data.title}/></TableCell>
                    <TableCell align="left">{item.data.title}</TableCell>
                    <TableCell align="left">
                      <div className='quantity'>
                        <div 
                          className='remove-cursor cursor'
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          &#10094;
                        </div>
                         {item.quantity}
                        <div 
                          className='add-cursor cursor'
                          onClick={() => handleAddItem(item.id)}
                        >
                          &#10095;
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="left">${item.data.price}</TableCell>
                    <TableCell 
                      align="left"
                      onClick={() => handleClearItem(item.id)}
                      className="cursor"
                    >
                      &#10005;
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h5" style={{fontWeight: "bold", textAlign: "right"}}>Total: ${totalPrice}</Typography>
        <br />
        {
          totalCount !== 0 ? 
          <Link to="/payment">
            <Button variant="contained" style={{fontWeight: "bold", float: "right"}}>
              Proceed to Checkout
            </Button>
          </Link>
          : 
          null
        }
      </div>
    </div>
  );
}

export default CheckoutPage;