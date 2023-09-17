import React from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import Homepage from './components/Homepage';


function App() {
  return (

    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Homepage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />

  </Routes>
    </BrowserRouter>
    
  );
}

export default App;
