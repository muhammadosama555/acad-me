import React from 'react'
import { useQueryClient } from 'react-query'
import AboutUs from '../components/AboutUs'
import Academies from '../components/Academies'
import Courses from '../components/Courses'
import Hero from '../components/Hero'
import News from '../components/News'

const Home = () => {

  const queryClient = useQueryClient()
  const user = queryClient.getQueryData('user')
  // console.log(user?.data.data.role)

  return (
    <>
    <Hero/>
    <Academies/>
    <Courses/>
    <AboutUs/>
    <News/>
    </>
  )
}

export default Home