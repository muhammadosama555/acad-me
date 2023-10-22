import { useRef } from "react";
import { useParams } from "react-router-dom";
import { usePostCourse } from "../../apiCalls/courseApiCalls";
import "./newCourse.css";
import Loader from '../../components/Loader'

export default function NewCourse() {

  const { academyId } = useParams()
  console.log(academyId)

  const titleInputElement = useRef();
  const descriptionInputElement = useRef();
  const weeksInputElement = useRef();
  const minimumSkillInputElement = useRef();
  const tuitionInputElement = useRef();

    
  const { mutate:postCourseMutate, isLoading:isPostCourseLoading, isError:isPostCourseError, error:postCourseError } = usePostCourse();
  
    
  if (isPostCourseLoading) {
    return <Loader/>
  }
  
  if (isPostCourseError) {
    return (
      <>
    {console.log(postCourseError.message)}
    </>
    )
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      bootcampId:academyId,
      title: titleInputElement.current?.value,
      description: descriptionInputElement.current?.value,
      weeks: weeksInputElement.current?.value,
      minimumSkill: minimumSkillInputElement.current?.value,
      tuition: tuitionInputElement.current?.value,
    };
    postCourseMutate( data );
  };
  

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Course</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
           type="text"
            placeholder="Outary special"
            ref={titleInputElement}
             />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
           type="text"
          placeholder="this course is excellent"
          ref={descriptionInputElement}
           />
        </div>
        <div className="addProductItem">
          <label>Weeks</label>
          <input
           type="number"
          placeholder="2"
          ref={weeksInputElement}
           />
        </div>
        <div className="addProductItem">
          <label>tuition</label>
          <input
           type="number"
          placeholder="3200"
          ref={tuitionInputElement}
           />
        </div>
        <div className="addProductItem">
          <label>MinimumSkill</label>
          <select
           name="minimumSkill"
            id="idMinimumSkill"
            ref={minimumSkillInputElement}
            >
            <option value="beginner">beginner</option>
                      <option value="intermediate">intermediate</option>
                      <option value="advance">advance</option>
          </select>
        </div>
        
        <div className="addProductItem">
        <label>ScholarshipAvailable</label>
                  <select
                   name="scholarshipAvailable"
                    id="idScholarshipAvailable"
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                  </select>
        </div>
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
