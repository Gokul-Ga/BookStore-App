import React, { useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AccountBox, Email, Lock, Phone } from '@mui/icons-material';
import img from '../components/assets/signup.png';
import Header from './Header';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', data);
      console.log(response.data);
      alert('Signup Successful');
      navigate('/login');
    } catch (error) {
      if (error.message === 'Request failed with status code 400') {
        alert('Email is already registered');
      }
      console.error(error);
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
      <Header />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'9em', marginBottom:'2.6em', }}>
        <Container maxWidth="lg"  >
          <Paper elevation={3} style={{ padding: '10px' , borderRadius:'35px' }}>
            <Typography mt={5} fontWeight={'bold'}  variant="h4" align="center" style={{ fontSize: 35,
                             background: "-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 50%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent", }}>
              Welcome! Sign Up for Bookish Delights
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <img src={img} alt="Image" style={{ width: '100%' }} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} mt={10} pr={3}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    fullWidth
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      startAdornment: <AccountBox />,
                    }}
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 3, message: 'Name must be at least 3 characters' },
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      startAdornment: <Email />,
                    }}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />

                  <TextField
                    fullWidth
                    label="Mobile"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      startAdornment: <Phone />,
                    }}
                    {...register('mobile', {
                      required: 'Mobile number is required',
                      pattern: { value: /^[0-9]{10}$/, message: 'Invalid mobile number (10 digits only)' },
                    })}
                    error={!!errors.mobile}
                    helperText={errors.mobile?.message}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    margin="normal"
                    variant="outlined"
                    type="password"
                    InputProps={{
                      startAdornment: <Lock />,
                    }}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                  <br /> <br />
                    <a href="/login" style={{textDecoration:'none'}}>Have an account? Log in.</a>
                    <br /> <br />
                  <Button type="submit" variant="contained" sx={{ mt: 2, borderRadius: 10, bgcolor: '#2b2d48' }} fullWidth>
                    Signup
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default Signup;





















