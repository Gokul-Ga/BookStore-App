import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'; // Import the Header component

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      alert(response.data.message)
      const token= response.data.token
      const userId= response.data.data._id
      const userRole= response.data.data.role
      const userName= response.data.data.name
      console.log(token)
      console.log(userId)
      sessionStorage.setItem("userToken",token)
      sessionStorage.setItem("userId",userId)
      sessionStorage.setItem('userRole', userRole);
      sessionStorage.setItem('userName', userName);
      
      
      
      // sessionStorage.setItem('authToken', authToken);
      // sessionStorage.setItem('userId', userId);
      // sessionStorage.setItem('userRole', userRole);
    
      

      // alert('Login Successful');

      navigate('/');
    } catch (error) {
      console.error(error);
      setLoginError('Invalid credentials. Please check your email and password.');
    }
  };

  useEffect(() => {
    document.body.classList.add('gradient-background');
    return () => {
      document.body.classList.remove('gradient-background');
    };
  }, []);

  return (
    <>
      <Header/>
      <Container maxWidth="xs" style={{ marginTop: '8em', minHeight: '86.1vh' }}>
        <Paper
          elevation={3}
          style={{
            width: '100%',
            height: '37em',
            borderRadius: '35px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '23em',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            style={{
              fontSize: 35,
              background: "-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 50%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome Back
          </Typography>

          <Typography variant="h6" mt={2} mb={3} align="center" fontWeight="bold" style={{ fontSize: '15px' }}>
            Please Enter Your Details
          </Typography>
          <form onSubmit={handleSubmit} style={{ padding: '30px' }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: <Email />,
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              type="password"
              InputProps={{
                startAdornment: <Lock />,
              }}
            />
            {loginError && (
              <Typography variant="body2" color="error">
                {loginError}
              </Typography>
            )}
            <Button type="submit" variant="contained" sx={{ mt: 2, borderRadius: 10, bgcolor: '#2ckd58' }} fullWidth>
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Login;














