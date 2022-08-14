import React from 'react';
import { Typography, Button, ImageList, ImageListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import homepage from '../assets/homepage.png';
import buttonBackground from '../assets/buttonBackground.png';
import imageData from '../components/imageData.js'
import '../styles/homepage.css'

function Homepage() {
  return (
    <div style={{textAlign: "center"}}>
      <div className='container'>
        <img src={homepage} alt="Homepage background" className='img-homepage'/>
        <Typography variant="h2" className='centered'>
          My Store
        </Typography>
      </div>
      <div className='description'>
        This website is built in React using Redux. Redux creates a global state for the whole application, 
        that can be accessed by any of your component. It is a state management library. You have only 
        one state for your whole app, and not states for each of your components.
      </div>
      <div className='container'>
        <img src={buttonBackground} alt="Button background" className='img-button'/>
        <Link to="/shop" style={{textDecoration: 'none'}} className='centered'>
          <Button variant="contained" size="large">
            Shop Now
          </Button>
        </Link>
      </div>
      <div className='description'>
        The data is fetched from the Fake Store API. The fakeStoreApi is a free online REST API that you 
        can use whenever you need Pseudo-real data for your e-commerce or shopping website without 
        running any server-side code. It's awesome for teaching purposes, sample codes, tests, etc.
        <br />
        <br />
        Styling is custom as well as using Material UI. MUI offers a comprehensive suite of UI tools 
        to help you ship new features faster. Start with Material UI, our fully-loaded component 
        library, or bring your own design system to our production-ready components.
      </div>
      <div className='img-list'>
        <ImageList sx={{ width: "100%" }} cols={3}>
          {imageData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}

export default Homepage;