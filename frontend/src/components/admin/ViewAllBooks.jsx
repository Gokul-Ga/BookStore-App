import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import Header from '../Header';
import Footer from '../Footer';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: 'lightblue',
  color: 'black',
  fontWeight: 'bolder',
}));

function GetBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/books/getbooks')
      .then((response) => {
        setBooks(response.data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false); 
      });
  }, []);

  const handleDelete = (bookId) => {
    axios
      .delete(`http://localhost:5000/api/books/${bookId}`)
      .then(() => {
        const updatedBooks = books.filter((book) => book._id !== bookId);
        setBooks(updatedBooks);
        toast.success('Book deleted successfully.');
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
        toast.error('Error deleting book.');
      });
  };

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Typography color={'aliceblue'} variant="h4" mt={'5%'} align="center" gutterBottom>
          ALL BOOKS
        </Typography>
        {loading ? ( 
          <CircularProgress
            style={{ margin: 'auto', display: 'block' }}
            size={80} 
          />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sl No</StyledTableCell>
                  <StyledTableCell>Book Name</StyledTableCell>
                  <StyledTableCell>Genre</StyledTableCell>
                  <StyledTableCell>Author</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book, index) => (
                  <TableRow key={book._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{book.bookName}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(book._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </Container>
      <Footer />
    </>
  );
}

export default GetBooks;






