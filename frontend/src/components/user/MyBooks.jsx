import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Header from '../Header';
import { Container } from '@mui/material';

const MyBooks = () => {
  const [rentedBooks, setRentedBooks] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);

  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('userToken');

  useEffect(() => {
    axios
      .post('http://localhost:5000/api/rentals/user', { userId, token })
      .then((response) => {
        setRentedBooks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching rented books:', error);

        if (error.response && error.response.status === 401) {
          setUnauthorized(true);
        }
      });
  }, [userId, token]);

  const UnauthorizedError = () => {
    return (
      <div>
        <h2>Unauthorized</h2>
        <p>You do not have permission to access this content.</p>
      </div>
    );
  };

  return (
    <>
      <Header />
      {unauthorized ? (
        <UnauthorizedError />
      ) : (
        <div style={{marginTop:'20px'}}>
          <Typography color={'aliceblue'} align='center'  variant='h4' fontWeight={'bold'} >MY BOOKS</Typography>
          <Container sx={{textAlign:'center'}}>
          <Grid container spacing={10} mt={2} sx={{textAlign:'center'}}>
            {rentedBooks.map((book) => (
              <Grid item xs={12} sm={6} md={5} lg={4} key={book._id}>
                <Card className="book-card" sx={{width:'350px', height:'300px',}} >
                  <CardContent >
                    <Typography variant="h5" component="div">
                      {book.book?.bookName || 'Title Not Available'}
                    </Typography>
                    <Typography color="text.secondary">
                      Author: {book.book?.author || 'Author Not Available'}
                    </Typography>
                    <Typography color="text.secondary">
                      Genre: {book.book?.genre || 'Genre Not Available'}
                    </Typography>
                    <Typography color="text.secondary">
                      Rental Date:{' '}
                      {book.rentalDate
                        ? new Date(book.rentalDate).toLocaleDateString()
                        : 'Date Not Available'}
                    </Typography>
                  </CardContent>
                  <CardActions  >
                    <Button   variant="contained" color="primary"   >
                      Return Book
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          </Container>
        </div>
      )}
    </>
  );
};

export default MyBooks;












