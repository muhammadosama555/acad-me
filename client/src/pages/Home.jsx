import React from 'react'
import { useQueryClient } from 'react-query'
import Academies from '../components/Academies'

const Home = () => {

  const queryClient = useQueryClient()
  const user = queryClient.getQueryData('user')
  // console.log(user?.data.data.role)

  return (
    <div><Academies/></div>
  )
}

export default Home