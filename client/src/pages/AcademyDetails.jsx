import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDeleteAcademy, useGetAcademyCourses, useGetAcademyDetails } from '../apiCalls/academyApiCalls'
import { useGetReviewByAcademyId, usePostReview } from '../apiCalls/reviewApiCalls'
import normalDate from '../utils'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'


const AcademyDetails = () => {

  const [toogleReview, setToogleReview] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");


  const { currentUser } = useSelector((state) => state.userSlice);
    const { academyId } = useParams()
    const { isLoading:isAcademyLoading, data:academyDetails } = useGetAcademyDetails(academyId)
    const { isLoading:isCoursesLoading, data:coursesData } = useGetAcademyCourses(academyId)
    const { isLoading:isReviewLoading, data:review} = useGetReviewByAcademyId(academyId)
    const { mutate:postReviewMutate, isLoading:isPostReviewLoading, isError:isPostReviewError , error:postReviewError } = usePostReview()
    const { mutate:deleteAcademyMutate, isLoading:isDeleteAcademyLoading } = useDeleteAcademy();

    if (isAcademyLoading) {
      return <Loader/>
    }
  
    if (isCoursesLoading) {
      return <Loader/>
    }

    if (isDeleteAcademyLoading ) {
      return <Loader/>
    }
  

    if (isReviewLoading ) {
      return <Loader/>
    }
  

    if (isPostReviewLoading ) {
      return <Loader/>
    }
  

    const deleteHandler = (academyId) => {
      deleteAcademyMutate( academyId );
    }

    console.log(academyDetails?.data)

  // calculate rating
  const rating = review.data.data.reduce(
    (acc, item) => acc + item.rating / review.data.count,
    0
  );
  console.log(rating)

  const submitReview = (event) => {
    event.preventDefault();
    setToogleReview(false)
    const data = {bootcampId:academyId,rating:ratings,title,text};
    postReviewMutate(data);
    console.log(data);
  };

console.log(coursesData)
  return (
    <>
     <div>
     </div> 

       <div>
        <h1 className="text-2xl text-center py-4 md:text-4xl lg:text-4xl xl:text-5xl font-bold">Academy Details</h1>
        <div className="md:flex md:justify-between lg:flex lg:justify-between xl:flex xl:justify-center xl:gap-32 mt-10">
            <div className="left mx-8 lg:mx-0 xl:mx-0 space-y-3">
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">Title:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{academyDetails.data.data.name}
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">Rating:</h1>
                    <div className="rating-outer">
        <div className="rating-inner" style={{width: `${(rating/5)*100}%`}}></div>
    </div>
                </div>
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1 ">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">Website:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{academyDetails.data.data.website}</p>
                </div>
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1 ">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">Description:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{academyDetails.data.data.description}</p>
                </div>
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1 ">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">Phone:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{academyDetails.data.data.phone}</p>
                </div>
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1 ">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">Email:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{academyDetails.data.data.email}</p>
                </div>
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1 ">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">Housing:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{academyDetails.data.data.housing ? <i class="fa-regular fa-square-check"></i> : <i class="fa-regular fa-square"></i>}</p>
                </div>
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1 ">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">Job Assistance:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{academyDetails.data.data.jobAssistance ? <i class="fa-regular fa-square-check"></i> : <i class="fa-regular fa-square"></i>}</p>
                </div>
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1 ">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">Job Gurantee:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{academyDetails.data.data.jobGurantee ? <i class="fa-regular fa-square-check"></i> : <i class="fa-regular fa-square"></i>}</p>
                </div>
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1 ">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">Accept Gi:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{academyDetails.data.data.acceptGi ? <i class="fa-regular fa-square-check"></i> : <i class="fa-regular fa-square"></i>}</p>
                </div>
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1 ">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">Created At:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{normalDate(academyDetails.data.data.createdAt)}</p>
                </div>
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1 ">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">Address:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{academyDetails.data.data.address}</p>
                </div>
            </div>
            <div className="right flex justify-start mx-8 my-4">
                <div className="w-[350px] h-[220px] md:w-[360px] md:h-[250px] lg:w-[370px] lg:h-[260px] xl:w-[380px] xl:h-[260px] bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: `url("images/course1.jpg")`}}></div>
            </div>
        </div>

        {currentUser?.data.role === "publisher" && currentUser?.data._id ===  academyDetails.data.data.user &&
     (<>
        <div className="flex justify-center mt-5 pb-3 gap-2">
                    <button
                        className="text-white font-semibold bg-red-color w-1/6 py-4 rounded-md bg-[#4a4cc7] hover:bg-[#4647ab] hover:transition-all"
                        id="register_button" type="submit"><Link to={`/updateacademy/${academyId}`}>UpdateAcademy</Link></button>
                    <button className="px-6 text-xl font-semibold py-3 rounded-lg hover:bg-yellow-400">  <Link to={`/listcourse/${academyId}`}>ListCourse</Link></button>
                    <button onClick={()=>deleteHandler(academyId)}
                        className="text-white font-semibold bg-red-600 w-1/6 py-4 rounded-md hover:bg-red-700 hover:transition-all"
                        id="register_button" type="submit">Delete</button>
                </div>
                </>
     )}

        {coursesData.data.data.length > 0 && (<>
        <div className="courses">
        <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl py-10 text-center font-bold">Courses</h1>
            <div className="flex flex-wrap gap-10 justify-center mt-10">
            {coursesData?.data.data.map((course)=>(

 <div key={course._id} className="card bg-white rounded-xl overflow-hidden w-[350px] md:w-[480px] lg:w-[420px] xl:w-[400px] shadow-2xl">
 <div className="relative">
     <div className="cart absolute right-4 top-4 bg-white w-12 pt-1 h-12 flex justify-center items-center rounded-full hover:bg-yellow-400 hover:cursor-pointer">
         <i className="text-xl fa-solid fa-cart-shopping"></i>
     </div>
     <div className="bg-cover w-[350px] h-[250px] md:w-[480px] md:h-[300px] lg:w-[420px] lg:h-[270px] xl:w-[400px] xl:h-[260px]" style={{ backgroundImage: `url("images/course1.jpg")`}}></div>
     
 </div>
 <div className="content mx-4 md:mx-8 lg:mx-6 xl:mx-6">
     <div className="flex items-center justify-between pt-4 pb-2 md:pt-8 md:pb-4 lg:pt-6 lg:pb-3">
         <div className="flex items-center gap-2 category rounded-md px-4 py-2 bg-opacity-20 bg-yellow-400">
             <div className="bg-yellow-400 rounded-full w-[10px] h-[10px]"></div>
             <h2 className="font-semibold text-sm md:text-base"><Link to={`/coursedetails/${course._id}/${academyId}`}>{course.title}</Link></h2>
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
                     {/* <i class="text-sm md:text-lg lg:text-base fa-regular fa-star"></i> */}
                     {course.scholarshipAvailable && <i class="fa-solid fa-check"></i>}
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

               ))}

            
            </div>
            <div className="flex justify-center py-10">
                <button
                    className="px-7 py-3 text-base text-gray-700 font-semibold rounded-lg bg-stone-200 hover:bg-stone-300">Load
                    More</button>
            </div>
        </div>
        </>)}
        <div className="reviews">
        {currentUser?.data.role === "user" &&
            <button onClick={() => setToogleReview(!toogleReview)} className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl py-10 text-center font-bold"> Add a Review</button>
         }

            <div className="reviews mx-6 md:mx-16 xl:mx-20 space-y-5">
            {toogleReview &&
                <div className="add-review flex justify-between gap-10 border-b pl-5 pb-5 border-slate-200">
                    <div className="flex flex-col w-full gap-3">
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span
                          key={value}
                          role="button"
                          onClick={() => setRatings(value)}
                          onKeyDown={() => setRatings(value)}
                          tabIndex={0}
                        >
                          {ratings >= value ? "⭐️" : "☆"}
                        </span>
                      ))}
                    </div>
                       <input onChange={(e) => setTitle(e.target.value)} className="outline-none w-full pl-3" type="text" placeholder="Title"/>
                        <input  onChange={(e) => setText(e.target.value)} className="outline-none w-full pl-3" type="text" placeholder="Comments here"/>
                        {isPostReviewError &&
                <div>
                  <p className='text-red-600'>{postReviewError.response.data.error}</p>
                </div>
                }
                    </div>
                    <div className="flex justify-end items-end">
                        <button onClick={submitReview}
                        className="px-7 py-2 text-base text-gray-700 font-semibold rounded-lg bg-stone-200 hover:bg-stone-300">Submit</button>
                    </div>
                </div>
                }
                  {review.data.data.length > 0 ? 
                   <>
                   <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl py-10 text-center font-bold">Reviews</h1>

{review.data.data.map(item=>(
<div className="review-card flex gap-5 relative border-b pb-5 border-slate-200">
    <img className="w-16 h-16 absolute rounded-full" src="images/profile.jpg" alt=""/>
    <div className="flex flex-grow flex-col pl-20">
        <div className="flex justify-between ">
            <h1 className="text-lg">{item.title}</h1>
            <h2 className="text-gray-300 text-sm">{normalDate(item.createdAt)}</h2>
        </div>
        <div className="rating-outer">
<div className="rating-inner" style={{width: `${(item.rating/5)*100}%`}}></div>
</div>
        <p className="font-light text-gray-600 pt-2">{item.text}</p>
    </div>
</div>
))}

<div className="flex justify-center py-10">
                    <button
                        className="px-7 py-3 text-base text-gray-700 font-semibold rounded-lg bg-stone-200 hover:bg-stone-300">Load
                        More</button>
                </div>
                    </> : null}
                
               


              
            </div>
        </div>
     

    </div>

    </>
  )
}

export default AcademyDetails