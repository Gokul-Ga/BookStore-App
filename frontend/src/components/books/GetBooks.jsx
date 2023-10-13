import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, CardActions, CardMedia, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import './Background.css';

function GetBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {

    setLoading(true);

    axios
      .get(`http://localhost:5000/api/books/getbooks?userId=${userId}`)
      .then((response) => {
        setBooks(response.data);
   
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
       
        setLoading(false);
      });
  }, [userId]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {loading ? ( 
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <CircularProgress
  style={{
    color: 'dodgerblue', 
    width: '60px',     
    height: '60px',
    animationDuration: '1s', 
  }}
/>
          </Grid>
        ) : (
          books.map((book) => (
            <Grid item key={book._id} xs={12} sm={4} md={2}>
              <Card
                className="card"
                style={{
                  margin: '3px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'aliceblue',
                }}
              >
                <CardMedia
                  component="img"
                  alt={book.bookName}
                  style={{
                    height: 180,
                    objectFit: 'scale-down',
                    marginTop: '2px',
                  }}
                  src={`data:${book.bookImage.contentType};base64,${book.bookImage.data}`}
                />
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {book.bookName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Genre:</strong> {book.genre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Author:</strong> {book.author}
                  </Typography>
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                  <Link
                    to={`/view/${book._id}?userId=${userId}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      style={{
                        margin: 'auto',
                        borderRadius: '20px',
                      }}
                      sx={{
                        width: '150px',
                        '&:hover': {
                          backgroundColor: 'dodgerblue',
                          color: 'aliceblue',
                        },
                      }}
                    >
                      View
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default GetBooks;
















