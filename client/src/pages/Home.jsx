import React from 'react'
import AboutUs from '../components/AboutUs'
import Academies from '../components/Academies'
import Courses from '../components/Courses'
import Hero from '../components/Hero'
import News from '../components/News'

const Home = () => {

  return (
    <>
    <Hero/>
    <Academies/>
    <Courses/>
    <div id="aboutUs">
    <AboutUs/>
    </div>
    <News/>
    </>
  )
}

export default Home