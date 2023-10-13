import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import Header from './Header';
import image1 from '../components/assets/homepage.png';
import image2 from '../components/assets/homepage2.png';
import GetBooks from './books/GetBooks';
import Footer from './Footer';

const slideshowImages = [image1, image2];

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const changeSlideshowImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
  };

  useEffect(() => {
    const interval = setInterval(changeSlideshowImage, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Header />
    
      <div className="homepage">
        <section className="slideshow" style={{ marginTop: '-0.1em' }}>
          <img
            src={slideshowImages[currentImageIndex]}
            alt="Slideshow"
            style={{ maxWidth: '100%', height: 'auto', marginLeft: '0px', marginRight: '0px' }}
          />
        </section>

        <section className="book-list">
          <Typography
            variant="h2"
            align="center"
            marginTop={10}
            padding={10}
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              background: "-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 50%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            BOOKS
          </Typography>
        </section>
<GetBooks/>
        
      </div>
      <Footer/>
    </>
    
  );
};

export default HomePage;














