import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Grid, Container, Paper, Box, InputLabel, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header';

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const SmallTextField = styled(TextField)`
  .MuiInputBase-input {
    font-size: 14px;
    padding: 15px;
  }
`;

const AddBooks = () => {

const [userToken,setUserToken]=useState(sessionStorage.getItem("userToken"))
const [userId,setUserId ]=useState(sessionStorage.getItem("userId"))

  const [formData, setFormData] = useState({
    bookName: '',
    genre: '',
    author: '',
    language: '',
    description: '',
    isbn: '',
    publicationYear: '',
    numberOfCopies: '',
    bookImage: null,
  });

  
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      bookImage: imageFile,
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(imageFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('token', userToken);

    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/books/addBook',
        formDataToSubmit,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        toast.success('Book added successfully', {
          position: toast.POSITION.TOP_CENTER,
        });

        setFormData({
          bookName: '',
          genre: '',
          author: '',
          language: '',
          description: '',
          isbn: '',
          publicationYear: '',
          numberOfCopies: '',
          bookImage: null,
        });
        setImagePreview(null);
      } else {
        toast.error('Error adding book', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      e.preventDefault();
      // console.error(error);
      if (error.response && error.response.status === 400) {

        if (error.response.data.message === 'Book with the same name already exists') {
          toast.error('Book with the same name already exists', {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error('An error occurred', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else {
        toast.error('An error occurred', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  return (

    <>
   <Header/>
    <Container sx={{mt:'1%'}} >
      <Paper elevation={3}>
        <Grid   >

        </Grid>
        <Box p={3}>
          <Typography variant="h4" textAlign={'center'} fontWeight={'bolder'} gutterBottom>
            ADD A BOOK
          </Typography>
          <StyledForm onSubmit={handleSubmit}>
            <SmallTextField
              label="Book Name"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <SmallTextField
              label="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <SmallTextField
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <SmallTextField
              label="Language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <SmallTextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              multiline
              rows={4}
            />
            <SmallTextField
              label="ISBN"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <SmallTextField
              label="Publication Year"
              name="publicationYear"
              value={formData.publicationYear}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <SmallTextField
              label="Number of Copies"
              name="numberOfCopies"
              type="number"
              value={formData.numberOfCopies}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <input
              type="file"
              name="bookImage"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="bookImageInput"
            />
            <InputLabel htmlFor="bookImageInput">
              <Button variant="contained" color="primary" component="span">
                Upload Book Image
              </Button>
            </InputLabel>
            {imagePreview && (
              <Avatar
                src={imagePreview}
                alt="Book Preview"
                variant="rounded"
                sx={{ width: 100, height: 100, marginTop: '8px' }}
              />
            )}
            <Button type="submit" variant="contained" color="primary">
              Add Book
            </Button>
          </StyledForm>
        </Box>
      </Paper>
      <ToastContainer />
    </Container>
    </>
  );
};

export default AddBooks;
