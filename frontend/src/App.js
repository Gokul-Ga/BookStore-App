import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import Homepage from './components/Homepage';
import UserProfile from './components/user/UserProfile';
import AddBooks from './components/books/AddBooks';
import GetBooks from './components/books/GetBooks';
import ViewBook from './components/books/ViewBook'; 
import MyBooks from './components/user/MyBooks';
import ViewAllUsers from './components/admin/ViewAllUsers';
import ViewAllBooks from './components/admin/ViewAllBooks';
import Footer from './components/Footer';
import ViewRentals from './components/admin/ViewRentals';

function App() {
 
  return (
    <Router>
       
      <Routes>
        
        <Route path="/addbook" element={<AddBooks />}/> 
        <Route path="/mybooks" element={<MyBooks />} />
        <Route path="/getbooks" element={<GetBooks />} />
        <Route path="/viewusers" element={<ViewAllUsers />} />
        <Route path="/allbooks" element={<ViewAllBooks />} />
        <Route path="/viewrentals" element={<ViewRentals />} />
        <Route path="/view/:id" element={<ViewBook />} /> 
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={<Login/>}
        />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
    </Router>
    
  );
}

export default App;






