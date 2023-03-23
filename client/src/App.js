import React from 'react'
import {Routes,Route} from "react-router-dom";
import "./App.css";
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AcademyDetails from './pages/AcademyDetails';
import Home from './pages/Home';

const App = () => {

  
  return (
   <>
   <Navbar/>
   <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path='/AcademyDetails/:id' element={<AcademyDetails/>}/>
   </Routes>
   <Footer/>
   </>
  )
}

export default App
