import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Container, CircularProgress } from '@mui/material';
import { css } from '@emotion/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../Header';

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading

  // Function to delete a user
  const deleteUser = async (userId) => {
    const token = sessionStorage.getItem('userToken');
    if (!token) {
      setError('No token found.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/delete-user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (response.status === 200) {
        // User deleted successfully, update the list
        const updatedUsers = users.filter((user) => user._id !== userId);
        setUsers(updatedUsers);
        toast.success('User deleted successfully'); 
      } else {
        setError('Error deleting user.');
      }
    } catch (error) {
      setError('Internal server error.');
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('userToken');
    if (!token) {
      setError('No token found.');
      setLoading(false); // Set loading to false to hide spinner
      return;
    }

    // Fetch the list of users
    fetch('http://localhost:5000/api/get-users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {

        // Exclude users with the name "Admin"
        const filteredUsers = data.filter((user) => user.name !== 'Admin');
        setUsers(filteredUsers);
        setLoading(false); // Set loading to false after data is loaded
      })
      .catch(() => {
        setError('Error fetching users.');
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <>
      <Header />
      <Container style={{ marginTop: '10%' }}>
        <div>
          <Typography variant='h4' fontWeight={'bolder'} color={'aliceblue'} textAlign={'center'}>LIST OF USERS</Typography>
          {loading ? ( // Display loading spinner while loading
            <CircularProgress
              style={{ margin: 'auto', display: 'block' }}
              size={80} // Adjust the size as needed
            />
          ) : (
            <>
              {error && <p>{error}</p>}
              <TableContainer component={Paper} style={{ marginTop: '5%' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sl No</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Mobile Number</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow key={user._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.mobile}</TableCell>
                        <TableCell>
                          <IconButton
                            sx={{ color: 'darkred' }}
                            onClick={() => deleteUser(user._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </Container>
    </>
  );
}

export default ViewUsers;

















