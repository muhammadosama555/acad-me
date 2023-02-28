import React from 'react'
import { Link } from 'react-router-dom'

const Academy = ({academy}) => {
  return (
    <div><Link to={`/academydetails/${academy._id}`}>{academy.name}</Link></div>
  )
}

export default Academy