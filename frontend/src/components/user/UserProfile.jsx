import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Box,
} from '@mui/material';
import Header from '../Header';
import Footer from '../Footer';
import unauthorized from '../assets/Unauthorised.jpg'

const UnauthorizedError = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="black"
    >
<img style={{width:'40%',textAlign:'center'}}  src={unauthorized} alt="" />

      {/* <Typography variant="h4" color="error">
      
        Unauthorized
      </Typography> */}
    </Box>
  );
};

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    name: '',
    email: '',
    mobile: '',
  });
  const [toastOpen, setToastOpen] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false); 

  useEffect(() => {
  
    const token = sessionStorage.getItem('userToken');
    if (token) {
     
      fetchUserProfile(token);
    } else {
      console.error('Token is missing.');
      setUnauthorized(true); 
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/user-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Failed to fetch user profile:', response.status);
      
        setUnauthorized(true); 
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      
      setUnauthorized(true); 
    }
  };

  const handleEditClick = () => {
    setUpdatedUserData({
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({ ...updatedUserData, [name]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      const token = sessionStorage.getItem('userToken');
      const response = await fetch('http://localhost:5000/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, updatedUserData }),
      });

      if (response.ok) {
        setOpenDialog(false);
        setToastOpen(true);
        
        fetchUserProfile(token);
      } else {
        console.error('Failed to update user profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  return (
    <>
    {unauthorized ? (
      // Display unauthorized error message if unauthorized
      <UnauthorizedError />
    ) : (
      <>
        <Header />
    


    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '400px',height:'400px', textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h4">User Profile</Typography>
          {userData ? (
            <div>
              <Typography variant="h6" style={{fontWeight:'bold'}}>Name: {userData.name}</Typography>
              <Typography variant="body1" style={{fontWeight:'bold'}}>Email: {userData.email}</Typography>
              <Typography variant="body1" style={{fontWeight:'bold'}}>Mobile: {userData.mobile}</Typography>
              <Button onClick={handleEditClick} variant="contained" sx={{ mt: 2 }}>
                Edit Profile
              </Button>
            </div>
          ) : (
            <Typography variant="body1">Loading profile...</Typography>
          )}
        </CardContent>
      </Card>

      {/* Edit Profile Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={updatedUserData.name}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={updatedUserData.email}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Mobile"
            name="mobile"
            value={updatedUserData.mobile}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateProfile} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Message */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleToastClose}
        message="Profile updated successfully"
      />
    </div>
      <Footer/>
      </>
      )}
    </>
  );
};

export default UserProfile;















