import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../apiCalls/userApiCalls';

const Navbar = () => {

const user = JSON.parse(localStorage.getItem("user")) || null

const { mutate, isLoading, isError, error,isSuccess } = useLogout();

const handleLogout = () => {
   mutate(localStorage.removeItem("user"))
}


  return (
    <>
    {!user ? (
    <>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
    <Link to="/">Acad-Me</Link>
    </>):(
      <>
       <Link to="/">Acad-Me</Link>
     {user?.data.role === "publisher" && 
     (<>
     <Link to="/listacademy">ListAcademy</Link>
     </>
     )} 
    <Link onClick={handleLogout}>Logout</Link>
      </>
    )}
    
    
    </>
  )
}

export default Navbar