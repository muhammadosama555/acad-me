import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetUserDetails, useLogout } from '../apiCalls/userApiCalls';
import Loader from './Loader';
import useOutsideClick from '../hooks/useOutsideClick';
import { useSelector } from 'react-redux';


const Navbar = () => {

const { currentUser } = useSelector((state) => state.userSlice);
const userId = currentUser?.data._id

const { cart } = useSelector((state) => state.cartSlice);

const sidebarRef = useRef();

const [toogleSidebar, setToogleSidebar] = useState(false)


useOutsideClick(sidebarRef, () => {
    if (toogleSidebar) setToogleSidebar(false);
  });

const { data:userDetails } = useGetUserDetails(userId)
const { mutate:logoutMutate, isLoading:isLogoutLoading, isError:isLogoutError, error:logoutError } = useLogout();

const userCart = cart[userId] || [];

if (isLogoutLoading) {
  return <Loader/>
}

if (isLogoutError) {
  return <h2>{logoutError.message}</h2>
}

const handleLogout = () => {
  logoutMutate()
}

const fallbackImage = "/images/avatar.jpg";


  return (
    <>
    <div ref={sidebarRef} className={`${!toogleSidebar && "hidden"} sidebar xl:hidden lg:hidden absolute z-50 right-0 bg-stone-50 w-[220px] sm:mr-8 md:mr-8`}>
        <div className="text-2xl absolute right-5 top-5"><i onClick={()=>setToogleSidebar(false)} className="fa-solid fa-xmark"></i></div>
        <ul className="text-lg pt-5">
        {!currentUser ? (<>
            <li className="border-b border-opacity-20 border-gray-800 py-3 pl-10 shadow-bold"><Link to="/">Home</Link></li>
            <li className="border-b border-opacity-20 border-gray-800 py-3 pl-10 shadow-bold"><a href="searchcourses">Courses</a></li>
            <li className="border-b border-opacity-20 border-gray-800 py-3 pl-10 shadow-bold"><a href="searchacademies">Academies</a></li>
            {currentUser?.data.role === "publisher" && 
            (<>
            <li className="border-b border-opacity-20 border-gray-800 py-3 pl-10 shadow-bold"><Link to="/listacademy">List Academy</Link></li>
            </>)}
            <li  className="border-b border-opacity-20 border-gray-800 py-3 pl-10 shadow-bold"><a href="#aboutUs">About</a></li>
            <li className="border-b border-opacity-20 border-gray-800 py-3 pl-10 shadow-bold"><a href="#contactUs">Contact</a></li>
            <li className="border-b border-opacity-20 border-gray-800 py-3 pl-10 shadow-bold"><Link to="/login">Log In</Link></li>
            <li className="border-b border-opacity-20 border-gray-800 py-3 pl-10 shadow-bold"><Link to="/register">Register</Link></li>
            </>):(
              <>
               <li className="border-b border-opacity-20 border-gray-800 py-3 pl-10 shadow-bold"><Link to="/" onClick={handleLogout}>Logout</Link></li>
              </>
            )}
        </ul>
    </div>
    <nav className="big-screen hidden lg:flex xl:flex py-6 items-center justify-between">
        <div className="flex items-center gap-8">
            <div className="logo text-3xl font">
                <Link to="/" className="cursor-pointer">
                    <h1 className="text-yellow-400 font-bold">e<span className="text-black font-bold">-demmy</span></h1>
                </Link>
            </div>
            <ul className="hidden lg:flex xl:flex text-lg font-semibold gap-6 pt-1">
                <li className="shadow-bold text-gray-400 hover:text-[#4a4cc7]"><Link to="/searchacademies">Academies</Link></li>
                <li className="shadow-bold text-gray-400 hover:text-[#4a4cc7]"><Link to="/searchcourses">Courses</Link></li>
                {currentUser?.data.role === "publisher" && 
                (<>
                <li className="shadow-bold text-gray-400 hover:text-[#4a4cc7]"><Link to="/listacademy">List Academy</Link></li>
                </>)}
                <li className="shadow-bold text-gray-400 hover:text-[#4a4cc7]"><a href="#aboutUs">About</a></li>
                <li className="shadow-bold text-gray-400 hover:text-[#4a4cc7]"><a href="#contactUs">Contact</a></li>
            </ul>
        </div>
        <div className="flex items-center">
            <div className="hidden lg:flex1 xl:flex1 Search-bar pl-4 pr-3 py-3 mr-2 mt-1 bg-stone-50 rounded-3xl">
                <input className="outline-none lg:w-56 bg-stone-50" type="text" placeholder="Type"/>
                <i className="text-xl hover:text-yellow-400 fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="icons flex pt-1 gap-5 items-center">
                <Link to="/searchacademies">
                    <i className="text-xl hover:text-yellow-400 fa-solid fa-magnifying-glass"></i>
                </Link>
                <div className="relative">
                    {userCart.length === 0 ? null :
                <div className="absolute -right-3 -top-1 rounded-full bg-red-700 text-xs text-white px-1">
                {userCart.length}
              </div>}
                    <Link to="/cart">
                        <i className="text-xl hover:text-yellow-400 fa-solid fa-cart-shopping"></i>
                    </Link>
                </div>
                {currentUser ? 
                <Link to="/profile">
            <div
              className="w-10 h-10 border border-gray-200  rounded-full"
              style={{
                backgroundImage: `url("${userDetails?.data.data.imgUrl}"), url("${fallbackImage}")`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            </Link>:null}
            </div>
            <div className="w-[2px] h-10 bg-yellow-200 ml-7 mr-2"></div>
            <div className="hidden lg:flex xl:flex text-center">
            {!currentUser ? (<>
                <Link to="/login"><button className="px-6 text-xl font-semibold py-3 rounded-lg hover:bg-yellow-400">Log In</button></Link>
                <Link to="/register"><button className="px-6 text-xl font-semibold py-3 rounded-lg hover:bg-yellow-400">Register</button></Link>
                </> ) : (
                  <>
                <Link to="/"><button onClick={handleLogout} className="px-6 text-xl font-semibold py-3 rounded-lg hover:bg-yellow-400">Logout</button></Link>
                  </>
                )}
            </div>
        </div>

    </nav>

    <nav className="small-screen lg:hidden xl:hidden flex mx-8 py-4 items-center justify-between">
        <div className="flex items-center gap-12">
            <Link to="/" className="flex logo text-xl">
                <h1 className="text-yellow-400 font-bold">e<span className="text-black font-bold">-demmy</span></h1>
            </Link>
            <ul className="hidden text-xl font-semibold gap-10 pt-1">
                <li className="shadow-bold text-gray-400 hover:text-[#4a4cc7]"><a href="academy-search.html">About</a></li>
                <li className="shadow-bold text-gray-400 hover:text-[#4a4cc7]"><a href="">About</a></li>
                <li className="shadow-bold text-gray-400 hover:text-[#4a4cc7]"><a href="">About</a></li>
                <li className="shadow-bold text-gray-400 hover:text-[#4a4cc7]"><a href="">About</a></li>
            </ul>
        </div>
        <div className="flex items-center">
            <div className="Search-bar hidden sm:flex md:flex items-center pl-4 pr-3 py-2 mr-2 bg-stone-50 rounded-3xl">
                <input className="outline- w-36 sm:flex sm:w-44 md:w-56 bg-stone-50" type="text" placeholder="Type"/>
                <i className=" hover:text-yellow-400 fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="icons flex pt-1 gap-4 items-center">
                <a className="" href="">
                    <i className=" hover:text-yellow-400 fa-solid fa-magnifying-glass"></i>
                </a>
                <div className="relative">
                    <div className="absolute h-2 w-2 rounded-full -right-1 -top-1"></div>
                    <a href="">
                        <i className=" hover:text-yellow-400 fa-solid fa-cart-shopping"></i>
                    </a>
                </div>
         
                    <i onClick={()=>setToogleSidebar(!toogleSidebar)} className=" hover:text-yellow-400 fa-solid fa-bars"></i>
             
            </div>
        </div>

        
    </nav>
    
    
    </>
  )
}

export default Navbar