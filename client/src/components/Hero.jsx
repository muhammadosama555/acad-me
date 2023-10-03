import React from 'react'
import { Link } from 'react-router-dom'

const Hero= () => {
  return (
    <>
        <div className="hero  bg-[#f6f6ee] h-[740px] lg:h-[600px] xl:h-[700px] overflow-hidden sm:mx-8 md:mx-8">
        <div className="Search-bar absolute sm:hidden md:hidden lg:hidden xl:hidden  w-full  flex items-center justify-between pl-4 pr-3 py-2 bg-stone-50 rounded-3xl">
            <input className="outline-none bg-stone-50" type="text" placeholder="Type"/>
            <i className=" hover:text-yellow-400 fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="wrapper-1 h-full flex flex-col lg:flex-row xl:flex-row items-center text-center gap-10 sm:gap-5 lg:gap-8 xl:gap-0">
            <div className="left mt-20 flex flex-col gap-5 px-8 lg:pl-8 lg:px-0 lg:w-1/2 xl:w-1/2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold">Move beyond limitations of e-learning.</h1>
                <p className="text-gray-500 sm:text-lg md:text-xl lg:text-xl xl:text-xl">Anytime, anywhere to discover yourself. </p>
                <Link to='/searchacademies'>
                    <button className="px-8 py-3 text-sm md:text-lg lg:text-lg xl:text-lg text-white font-semibold rounded-lg bg-[#4a4cc7] hover:bg-[#4647ab]">Get Started</button>
                </Link>
            </div>
            <div className="right flex relative sm:mt-10 lg:w-1/2 xl:w-1/2">
                <div className="w-[370px] h-[370px] lg:w-[420px] lg:h-[420px] xl:w-[470px] xl:h-[470px] overflow-hidden mb-8  rounded-full border-2 border-dashed border-gray-900 flex items-center justify-center">
                    <div className="w-[340px] h-[340px] lg:w-[380px] lg:h-[380px] xl:w-[420px] xl:h-[420px] relative overflow-hidden bg-[#f8ca3c] rounded-full flex items-end justify-center">
                        <div className="w-[290px] h-[280px] lg:w-[320px] lg:h-[310px] xl:w-[350px] xl:h-[340px] rounded-full z-10 bg-[#fddc75] absolute -bottom-7"></div>
                    </div>
                    <div className="absolute top-1 w-[310px] lg:w-[350px] xl:w-[400px] z-30"><img src="images/hero-png.png" alt=""/></div>
                </div>
                <div className="card1 z-40 w-20 h-24 lg:w-32 lg:h-36 xl:w-32 xl:h-36 absolute top-10 left-8 lg:left-0 lg:top-0 xl:left-0 xl:top-5 bg-white flex flex-col items-center justify-center rounded-xl">
                    <div className="w-12 h-12 lg:w-20 lg:h-20 xl:w-20 xl:h-20 rounded-full bg-cover bg-center" style={{ backgroundImage: `url("images/profile1.jpg")`}} alt=""></div>
                    <div className="w-[80%] lg:w-[75%] xl:w-[75%] h-[5px] mt-3 lg:mt-4 xl:mt-4 mb-1 lg:mb-[6px] xl:mb-[6px] rounded-full bg-[#37a992]"></div>
                    <div className="w-[60%] lg:w-[50%] xl:w-[50%] h-[5px] rounded-full bg-[#9adccf]"></div>
                </div>
                <div className="card2 w-40 lg:w-48 xl:w-52 pl-1 py-4 lg:py-6 lg:pl-2 xl:py-6 xl:pl-3 text-left absolute bg-white bottom-6 left-2 lg:left-0 xl:-left-8 z-30 rounded-xl flex flex-col justify-center gap-2">
                    <div className="flex gap-4 px-3 relative">
                        <p className="text-[#37a992] absolute -top-10 pt-[2px] left-2 text-6xl">.</p>
                        <span className="font-semibold pl-4 text-sm text-gray-600">Largest Collection in every course</span>
                    </div>
                    <div className="flex gap-4 px-3 relative">
                        <p className="text-[#37a992] absolute -top-10 pt-[2px] left-2 text-6xl">.</p>
                        <span className="font-semibold pl-4 text-sm text-gray-600">Expert Instructors</span>
                    </div>
                </div>
                <div className="card3 z-40 w-32 px-6 h-32  lg:w-44 lg:h-32 lg:px-0 xl:w-44 xl:h-32 xl:px-0 absolute bg-white flex flex-col items-center justify-center text-center leading-tight top-0 right-4 xl:left-72 rounded-xl gap-3">
                    <div className="bg-[#ed9be3] px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold">NEW</span>
                    </div>
                    <p className="font-semibold text-sm text-gray-600">Get 20% off in every course</p>
                </div>
                <div className="card4 h-[200px] w-44 xl:w-52 xl:h-[220px] bg-white absolute right-0 lg:left-64 xl:left-80 -bottom-3 z-30 rounded-xl flex flex-col items-center justify-center">
                    <div className="p-4 rounded-full flex justify-center items-center bg-[#fff2ec] w-12 h-12 mb-3">
                        <i className="text-xl text-[#fd901c] fa-solid fa-users"></i>
                    </div>
                    <div className="flex flex-col items-center pb-2">
                        <p className="text-sm xl:text-lg font-semibold">Total Students</p>
                        <p className="text-2xl xl:text-4xl font-bold">15K</p>
                    </div>
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-stone-50">
                            <img src="images/profile.jpg" alt=""/>
                        </div>
                        <div className=" w-8 h-8 rounded-full overflow-hidden border-2 border-stone-50">
                            <img src="images/profile1.jpg" alt=""/>
                        </div>
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-stone-50">
                            <img src="images/profile2.jpg" alt=""/>
                        </div>
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-stone-50">
                            <img src="images/profile3.jpg" alt=""/>
                        </div>
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-stone-50">
                            <img src="images/profile4.jpg" alt=""/>
                        </div>
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-stone-50">
                            <img src="images/profile5.jpg" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Hero