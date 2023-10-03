import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // This adds a smooth scrolling animation
        });
      };

  return (
    <>
    <footer className="flex flex-wrap lg:flex-nowrap xl:flex-nowrap gap-16 lg:gap-10 my-20 px-8">
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 flex flex-col gap-5">
            <div onClick={scrollToTop} className="logo text-3xl cursor-pointer">
                <h1 className="text-yellow-400 font-bold">e<span className="text-black font-bold">-demmy</span></h1>
            </div>
            <p className="text-gray-600 font-semibold">Top instructors from around the world teach trillions of students.</p>
            
        </div>

        <div className="flex  gap-16">
            <div className="space-y-5">
                <h1 className="text-xl font-semibold">Information</h1>
                <ul className="text-gray-600 text-lg space-y-2 pl-3">
                    <li onClick={scrollToTop} className="cursor-pointer hover:text-black hover:font-semibold">Home</li>
                    <li className="hover:text-black hover:font-semibold"><a href="#aboutUs">About Us</a></li>
                </ul>
            </div>
            <div className="space-y-5">
                <h1 className="text-xl font-semibold">Links</h1>
                <ul className="text-gray-600 text-lg space-y-2 pl-3">
                    <li className="hover:text-black hover:font-semibold"><Link to="searchacademies">Academies</Link></li>
                    <li className="hover:text-black hover:font-semibold"><Link to="searchcourses">Courses</Link></li>
                </ul>
            </div>
           
            <div className="space-y-5">
                <h1 className="text-xl font-semibold">Contact</h1>
                <p className="text-gray-600 text-lg pl-3">2715 Ash Dr. San Jose, South Pindi 46000</p>
                <p className="text-gray-600 text-lg pl-3">example@company.com</p>
                <p className="text-gray-600 text-lg pl-3">(403) 555-2030</p>
                <div className="flex items-center gap-5 text-lg pl-3">
                    <h2 className="text-lg font-semibold">Follow Us:</h2>
                    <i className="hover:text-[#4a4cc7] hover:cursor-pointer fa-brands fa-facebook-f"></i>
                    <i className="hover:text-[#4a4cc7] hover:cursor-pointer fa-brands fa-twitter"></i>
                    <i className="hover:text-[#4a4cc7] hover:cursor-pointer fa-brands fa-instagram"></i>
                    <i className="hover:text-[#4a4cc7] hover:cursor-pointer fa-brands fa-linkedin-in"></i>
                </div>
            </div>
        </div>
       
    </footer>
    </>
  )
}

export default Footer