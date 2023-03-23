import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

const user = JSON.parse(localStorage.getItem("user")) || null
console.log(user)

  return (
    <>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
     <Link to="/">Acad-Me</Link>
     {user?.data.role === "publisher" && 
     (<>
     <Link to="/listacademy">ListAcademy</Link>
     <Link to="/listcourse">ListCourse</Link>
     </>
     )} 
    <Link>Logout</Link>
    </>
  )
}

export default Navbar