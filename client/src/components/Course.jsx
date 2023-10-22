import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { addToCart } from '../redux/reducers/cartReducers';
import { useGetUserDetails } from '../apiCalls/userApiCalls';


const Course = ({course}) => {

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.userSlice);
    const userId = currentUser?.data._id

    const { data:userDetails } = useGetUserDetails(userId)
    

    const isCourseOrdered = userDetails?.data.data.orders.some(order => {
        return order.itemsOrderd.some(item => item === course._id);
      });


    // Handler function for adding the course to the cart
    const handleAddToCart = () => {
      // Dispatch the addToCart action with the course as payload
      dispatch(addToCart({ course, userId }))
      console.log("add to cart",userId)
    }

  return (
        <>
     <div className="card bg-white rounded-xl overflow-hidden w-[350px] md:w-[480px] lg:w-[420px] xl:w-[400px] shadow-2xl">
             
                <div className="relative">
                {!isCourseOrdered && currentUser?.data.role === "user" ?
                    <div onClick={handleAddToCart} className="cart absolute right-4 top-4 bg-white w-12 pt-1 h-12 flex justify-center items-center rounded-full hover:bg-yellow-400 hover:cursor-pointer">
                        <i className="text-xl fa-solid fa-cart-shopping"></i>
                    </div>: null}
                    <div className="bg-cover w-[350px] h-[250px] md:w-[480px] md:h-[300px] lg:w-[420px] lg:h-[270px] xl:w-[400px] xl:h-[260px]" style={{ backgroundImage: `url("images/course1.jpg")`}}></div>
                    
                </div> 
                <div className="content mx-4 md:mx-8 lg:mx-6 xl:mx-6">
                    <div className="flex items-center justify-between pt-4 pb-2 md:pt-8 md:pb-4 lg:pt-6 lg:pb-3">
                        <div className="flex items-center gap-2 category rounded-md px-4 py-2 bg-opacity-20 bg-yellow-400">
                            <div className="bg-yellow-400 rounded-full w-[10px] h-[10px]"></div>
                            <h2 className="font-semibold text-sm md:text-base"><Link to={`/coursedetails/${course._id}`}>{course.title}</Link></h2>
                        </div>
                        <div className="price text-xl md:text-2xl font-bold text-[#4a4cc7]">${course.tuition}</div>
                    </div>
                    <h2 className="description text-lg md:text-xl font-semibold">
                    {course.description}
                    </h2>
                    <hr className="my-3 md:my-5"/>
                    <div className="flex justify-between pb-6 md:pb-8">
                        <div className="flex gap-4 md:gap-8 lg:gap-6">
                            <div className="flex items-center gap-2 md:gap-3 lg:gap-3">
                                <div className="rounded-full border p-2 md:p-3 flex items-center justify-center">
                                    <i className="text-sm md:text-lg lg:text-base fa-regular fa-user"></i>
                                </div>
                                <p className="font-semibold text-sm md:text-base lg:text-base">{course.weeks}</p>
                            </div>
                            <div className="flex items-center gap-2 md:gap-3 lg:gap-3">
                                <div className="rounded-full border p-2 md:p-3 flex items-center justify-center">
                                    <i className="text-sm md:text-lg lg:text-base fa-regular fa-eye"></i>
                                </div>
                                <p className="font-semibold text-sm md:text-base lg:text-base">{course.minimumSkill}</p>
                            </div>
                            <div className="flex items-center gap-2 md:gap-3 lg:gap-3">
                                <div className="rounded-full border p-2 md:p-3 flex items-center justify-center">
                                    {/* <i className="text-sm md:text-lg lg:text-base fa-regular fa-star"></i> */}
                                    {course.scholarshipAvailable && <i className="fa-solid fa-check"></i>}
                                </div>
                                <p className="font-semibold text-sm md:text-base lg:text-base">scholarshipAvailable {course.scholarshipAvailable}</p>
                            </div>
                        </div>
                        <div className="rounded-full overflow-hidden">
                            <img className="h-10 w-10" src="images/profile.jpg" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Course