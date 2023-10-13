import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Badge,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fontGrid } from '@mui/material/styles/cssUtils';
import Header from '../Header';
import "./Background.css"
import Footer from '../Footer';

function ViewBook({ openDialog, setOpenDialog }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [openRentDialog, setOpenRentDialog] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [rentalInfo, setRentalInfo] = useState({
    userName: '',
    contactNumber: '',
  });
  const [userReview, setUserReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);

        // Fetch reviews for the book
        const reviewsResponse = await axios.get(`http://localhost:5000/api/reviews/getReviews?bookId=${id}`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleRentClick = () => {
    setOpenRentDialog(true);
  };

  const handleReviewClick = () => {
    setOpenReviewDialog(true);
  };

  const handleDialogClose = () => {
    setOpenRentDialog(false);
    setOpenReviewDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRentalInfo({
      ...rentalInfo,
      [name]: value,
    });
  };

  const handleRentSubmit = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      
      toast.error('You must be logged in to rent a book.');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:5000/api/books/rentBook',
        {
          bookname: book.bookName,
          bookId: book._id,
          userId,
          userName: rentalInfo.userName,
          contactNumber: rentalInfo.contactNumber,
        }
      );

      if (response.status === 201) {
        
        const updatedBook = { ...book };
        updatedBook.numberOfCopies -= 1;

        
        await axios.put(`http://localhost:5000/api/books/updateCopies/${book._id}`, {
          numberOfCopies: updatedBook.numberOfCopies,
        });

        toast.success('Book rented successfully for 1 week!');
      } else if (response.status === 409) {
       
        toast.error('You have already rented this book.');
      } else {
       
        toast.error('An error occurred while renting the book.');
      }

      
      handleDialogClose();
    } catch (error) {
      console.error('Error creating rental:', error);
    
      toast.error('You have already rented this book.');
    }
  };

  const handleReviewSubmit = async () => {
    const userId = sessionStorage.getItem('userId');
    const userName = sessionStorage.getItem('userName');
    if (!userId) {
     
      toast.error('You must be logged in to write a review.');
      return;
    }
  
    try {
     
      const rentalResponse = await axios.get(`http://localhost:5000/api/rentals/checkRental?userId=${userId}&bookId=${id}`);
      const hasRented = rentalResponse.data.hasRented;
  
      if (!hasRented) {
        toast.error('You must rent the book to write a review.');
        return;
      }
  
     
      const reviewResponse = await axios.post('http://localhost:5000/api/reviews/addReview', {
        bookname:book.bookName,
        bookId: id,
        userId,
        userName,
        content: userReview,
      });
  
      if (reviewResponse.status === 201) {
        toast.success('Review added successfully');
        setReviews([...reviews, reviewResponse.data]);
        setUserReview('');
        setOpenReviewDialog(false); 
      } else {
        toast.error('Error adding review');
      }
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Error adding review');
    }
  };

  return (
    <>
    <Header/>
    <Container maxWidth="xl" sx={{ mt: 15 }}>
      {book ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card sx={{boxShadow: 'none', backgroundColor: 'aliceblue', border: '1px solid skyblue',width:'350px',height:'520px' }}>
              <CardMedia
                component="img"
                alt={book.bookName}
                style={{ objectFit:'' }}
                src={`data:${book.bookImage.contentType};base64,${book.bookImage.data}`}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Card sx={{ boxShadow: '1px' }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {book.bookName}
                  <Badge
                    sx={{ paddingLeft: '90px' }}
                    color={book.numberOfCopies === 0 ? 'error' : 'success'}
                    badgeContent={book.numberOfCopies === 0 ? 'Not Available' : 'Available'}
                  ></Badge>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Genre:</strong> {book.genre}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Language:</strong> {book.language}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Author:</strong> {book.author}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  <strong>Description:</strong> {book.description}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Publication Year:</strong> {book.publicationYear}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>ISBN Number:</strong> {book.isbn}
                </Typography>
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleRentClick}
                  disabled={book.numberOfCopies === 0}
                >
                  Rent
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
      )}

      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Typography variant="h4" fontWeight={'bold'} color={'aliceblue'}>REVIEWS</Typography>
        <div style={{backgroundColor:'gray',borderRadius:'5px',padding:'20px',marginTop:'1%' }}>
          {reviews
            .filter((review) => review.bookId === id) 
            .map((review) => (
              <div key={review._id}>
                <Typography variant="subtitle1" sx={{fontWeight:'bolder',color:'Black',fontStyle:'revert-layer'}} > {review.userName} :</Typography>
                <Typography variant="body2"  style={{color:'aliceblue',fontStyle:'italic'}}>{review.content}</Typography>
                <br />
              </div>
            ))}
        </div> <br /><br />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleReviewClick}
        >
          Write a Review
        </Button>
      </Container>

      <Dialog open={openRentDialog} onClose={handleDialogClose}>
        <DialogTitle>Rent Book</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Book Name: {book ? book.bookName : ''}</Typography>
          <Typography variant="subtitle1">Author: {book ? book.author : ''}</Typography>
          <TextField
            fullWidth
            margin="normal"
            name="userName"
            label="Your Name"
            value={rentalInfo.userName}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="contactNumber"
            label="Contact Number"
            value={rentalInfo.contactNumber}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRentSubmit} color="primary">
            Rent
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openReviewDialog} onClose={handleDialogClose} > 
        <DialogTitle >Write a Review</DialogTitle>
        <DialogContent style={{width:'500px'}}>
          <Typography variant="subtitle1">Book Name: {book ? book.bookName : ''}</Typography>
          <Typography variant="subtitle1">Author: {book ? book.author : ''}</Typography>
          <TextField
            fullWidth
            margin="normal"
            name="userReview"
            label="Your Review"
            multiline
            rows={4}
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReviewSubmit} variant='contained' color="success" sx={{borderRadius:'20px'}}>
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Container>
    <Footer/>
    </>
  );
}

export default ViewBook;












