import React from 'react';
import { AppBar, Toolbar, Typography } from "@mui/material";

function Footer(props) {
  return (
    <AppBar position="sticky" elevation={0} component="footer" color="default">
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography variant="caption">Copyright © Farrukh 2022</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;