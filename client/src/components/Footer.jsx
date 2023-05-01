import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="flex flex-wrap lg:flex-nowrap xl:flex-nowrap gap-16 lg:gap-10 my-20 px-8">
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 flex flex-col gap-5">
            <div className="logo text-3xl">
                <h1 className="text-yellow-400 font-bold">e<span className="text-black font-bold">-demmy</span></h1>
            </div>
            <p className="text-gray-600 font-semibold">Top instructors from around the world teach trillions of students.</p>
            
            <div className="subscribe">
                <h1 className="font-bold text-xl pb-3">Subscribe Newsletter</h1>
                <div className="flex items-center bg-[#eeedf2] justify-between rounded-xl pl-5">
                    <input className="bg-[#eeedf2] py-4 w-full pr-5 outline-none text-lg" type="text" placeholder="Your email here"/>
                    <div className="h-12 w-14 mr-2 rounded-xl flex justify-center items-center bg-[#4a4cc7]  hover:bg-[#4647ab] hover:cursor-pointer"><i className="text-xl text-white -ml-1 fa-regular fa-paper-plane"></i></div>
                </div>
            </div>
        </div>

        <div className="flex flex-wrap gap-16">
            <div className="space-y-5">
                <h1 className="text-xl font-semibold">Information</h1>
                <ul className="text-gray-600 text-lg space-y-2 pl-3">
                    <li className="hover:text-black hover:font-semibold"><a href="">Home</a></li>
                    <li className="hover:text-black hover:font-semibold"><a href="">About</a></li>
                    <li className="hover:text-black hover:font-semibold"><a href="">Academies</a></li>
                    <li className="hover:text-black hover:font-semibold"><a href="">Courses</a></li>
                </ul>
            </div>
            <div className="space-y-5">
                <h1 className="text-xl font-semibold">Helpful Links</h1>
                <ul className="text-gray-600 text-lg space-y-2 pl-3">
                    <li className="hover:text-black hover:font-semibold"><a href="">Students</a></li>
                    <li className="hover:text-black hover:font-semibold"><a href="">Business</a></li>
                    <li className="hover:text-black hover:font-semibold"><a href="">Instructor</a></li>
                </ul>
            </div>
            <div className="space-y-5">
                <h1 className="text-xl font-semibold">Our Service</h1>
                <ul className="text-gray-600 text-lg space-y-2 pl-3">
                    <li className="hover:text-black hover:font-semibold"><a href="">Design</a></li>
                    <li className="hover:text-black hover:font-semibold"><a href="">Business</a></li>
                    <li className="hover:text-black hover:font-semibold"><a href="">Study</a></li>
                    <li className="hover:text-black hover:font-semibold"><a href="">UI/UX</a></li>
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