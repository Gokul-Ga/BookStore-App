import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import Header from './Header';
import BooksData from './Books';
import image1 from '../components/assets/homepage.png';

import image2 from '../components/assets/image2.png';

const BookItem = ({ book }) => (
  <Box width="230px" padding={2} className="book-item">
    <img
      src={book.image}
      alt={book.title}
      width="50%"
      height="200px"
    />
    <Typography variant="h6" component="div">
      {book.title}
    </Typography>
    <Typography color="textSecondary">
      Author: {book.author}
    </Typography>
    <Typography color="textSecondary">
      Publication Year: {book.publicationYear}
    </Typography>
    <Typography color="textSecondary">
      Genre: {book.genre}
    </Typography>
    <Typography color="textSecondary">
      ISBN: {book.isbn}
    </Typography>
    <br />
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to={`/rent/${book.id}`}
    >
      Rent
    </Button>
  </Box>
);

const slideshowImages = [image1, image2,];

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setBooks(BooksData);
  }, []);

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
        <section className="slideshow" style={{ marginTop: '4em' }}>
          <img
            src={slideshowImages[currentImageIndex]}
            alt="Slideshow"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </section>

        <section className="book-list">
          <Typography
            variant="h3"
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
            New Books
          </Typography>
          <Box display="flex" width="100%" justifyContent="center" flexWrap="wrap">
            {books.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </Box>
        </section>
      </div>
    </>
  );
};

export default HomePage;























