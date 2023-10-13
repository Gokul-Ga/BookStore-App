import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../Header';

function ViewRentals() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        // Fetch rentals from the backend API
        const response = await axios.get('http://localhost:5000/api/rentals/allrentals');
        setRentals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRentals();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Delete a rental by ID
      await axios.delete(`http://localhost:5000/api/rentals/allrentals/${id}`);
      setRentals(rentals.filter((rental) => rental._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Header/>
    <Typography variant='h4' textAlign={'center'} fontWeight={'bolder'} color={'aliceblue'}  marginTop={'5%'}>RENTALS DETAILS</Typography>
    <TableContainer component={Paper} style={{maxWidth:'800px', margin: 'auto',marginTop:'10%' }}  >
    
      <Table >
        
        <TableHead>
          <TableRow>
            <TableCell>Sl. No.</TableCell>
            <TableCell>Book Name</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>Rental Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rentals.map((rental, index) => (
            <TableRow key={rental._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{rental.bookname}</TableCell>
              <TableCell>{rental.userName}</TableCell>
              <TableCell>{rental.contactNumber}</TableCell>
              <TableCell>{new Date(rental.rentalDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(rental._id)}  style={{color:'red'}}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default ViewRentals;
