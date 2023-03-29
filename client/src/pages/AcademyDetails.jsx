import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDeleteAcademy, useGetAcademyCourses, useGetAcademyDetails } from '../apiCalls/academyApiCalls'
import { useGetReviewByAcademyId, usePostReview } from '../apiCalls/reviewApiCalls'


const AcademyDetails = () => {

  const [toogleReview, setToogleReview] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");


    const user = JSON.parse(localStorage.getItem("user")) || null  
    const { academyId } = useParams()
    const { isLoading:isAcademyLoading, data:academyDetails, isError:isAcademyError , error:academyError } = useGetAcademyDetails(academyId)
    const { isLoading:isCoursesLoading, data:coursesData, isError:isCoursesError , error:coursesError } = useGetAcademyCourses(academyId)
    const { isLoading:isReviewLoading, data:review, isError:isReviewError , error :ReviewError } = useGetReviewByAcademyId(academyId)
    const { mutate:postReviewMutate, isLoading:isPostReviewLoading, isError:isPostReviewError , error:postReviewError, isSuccess:isPostReviewSuccess } = usePostReview()
    const { mutate, isLoading, isError, error } = useDeleteAcademy();

    if (isAcademyLoading) {
      return <h2>Loading...</h2>
    }
  
    if (isAcademyError) {
      return (
        <>
      <h2>{academyError.message}</h2>
      </>
      )
    }

    if (isCoursesLoading) {
      return <h2>Loading...</h2>
    }
  
    if (isCoursesError) {
      return (
        <>
      <h2>{coursesError.message}</h2>
      </>
      )
    }

    if (isLoading ) {
      return <h2>Loading...</h2>
    }
  
    if (isError) {
      return (
        <>
      <h2>{error.message}</h2>
      </>
      )
    }

    if (isReviewLoading ) {
      return <h2>Loading...</h2>
    }
  
    if (isReviewError) {
      return (
        <>
      <h2>{ReviewError.message}</h2>
      </>
      )
    }

    if (isPostReviewLoading ) {
      return <h2>Loading...</h2>
    }
  
    if (isPostReviewError) {
      return (
        <>
      <h2>{postReviewError.message}</h2>
      </>
      )
    }

    const deleteHandler = (academyId) => {
      mutate( academyId );
    }

    console.log(review)

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

  return (
    <div>
      <div>
      {user?.data.role === "publisher" && user?.data._id ===  academyDetails.data.data.user &&
     (<>
     <Link to={`/listcourse/${academyId}`}>ListCourse</Link>
     <Link to={`/updateacademy/${academyId}`}>UpdateAcademy</Link>
     <button onClick={()=>deleteHandler(academyId)}>delete</button>
     </>
     )}
     </div> 
    {academyDetails && academyDetails.data.data.name}
    <div>no of views: {review.data.count}</div>
    <div>
    <div className="rating-outer">
        <div className="rating-inner" style={{width: `${(rating/5)*100}%`}}></div>
    </div>
    </div>
    {user?.data.role === "user" &&
    <div>
      <button  onClick={() => setToogleReview(!toogleReview)}>Submit Review</button>
    </div>
    }
    {toogleReview &&
    <div >
         <h2>Submit Review</h2>
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
                    <label>Title</label>
                    <input type="text"  onChange={(e) => setTitle(e.target.value)}/>
                    <label>Comment</label>
                    <textarea
                      name="review"
                      id="review"
                      onChange={(e) => setText(e.target.value)}
                    ></textarea>
                    <button onClick={submitReview}>
                      Submit
                    </button>
    </div>
    }

    <div>
      <h1>your reviews</h1>
      {review.data.data.map(item=>(
        <>
        <div className="rating-outer">
        <div className="rating-inner" style={{width: `${(item.rating/5)*100}%`}}></div>
    </div>
    
        <div>
        {item.title}
        </div>
        <div>
        {item.text}
        </div>
        </>
      ))}
    </div>

    {coursesData?.data.data.map((course)=>(
        <div  key={course._id}>{
       <Link to={`/coursedetails/${course._id}`}>{course.title}</Link>}</div>

      ))}
    </div>
  )
}

export default AcademyDetails