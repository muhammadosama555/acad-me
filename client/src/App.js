import React from 'react'
import {Routes,Route} from "react-router-dom";
import "./App.css";
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const App = () => {

  
  return (
   <>
   <Navbar/>
   <Routes>
   <Route path='/' element={<Home/>}/>
   </Routes>
   <Footer/>
   </>
  )
}

export default App
