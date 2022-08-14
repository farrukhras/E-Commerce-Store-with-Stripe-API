import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const { totalCount } = useSelector((state) => state.store);

  return (
    <AppBar position="static">
      <Toolbar style={{
        display: "flex",
        justifyContent: "space-between",
      }}>
        <Link style={{textDecoration: 'none', color: '#FFF'}} to="/">
          <Typography variant="overline"> My Store</Typography>
        </Link>
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Link style={{textDecoration: 'none', marginRight: "20px"}} to="/shop">
            <Typography variant="overline" style={{color: "#fff"}}>Shop</Typography>
          </Link>
          <div>
            <Link style={{textDecoration: 'none', marginRight: "2px"}} to="/checkout">
              <Typography variant="overline" style={{color: "#fff"}}>Cart</Typography>
            </Link>
            <Typography variant="overline" style={{fontWeight: "bold"}}>{totalCount}</Typography>
          </div>
        </div>
      </Toolbar>
    </AppBar>  
  );
}

export default Header;