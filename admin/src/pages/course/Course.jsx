import { Link, useParams } from "react-router-dom";
import "./course.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useGetCourseDetails, useUpdateCourse } from "../../apiCalls/courseApiCalls";
import normalDate from "../../utils";
import { useRef } from "react";

export default function Course() {

    const { courseId } = useParams()
    console.log(courseId)
  
    const titleInputElement = useRef();
    const descriptionInputElement = useRef();
    const weeksInputElement = useRef();
    const minimumSkillInputElement = useRef();
    const tuitionInputElement = useRef();

    const {isLoading:isCourseDetailsLoading, data:courseDetails, isError:isCourseDetailsError, error:courseDetailsError} = useGetCourseDetails(courseId)
    const { mutate:updateCourseMutate, isLoading:isUpdateCourseLoading, isError:isUpdateCourseError, error:updateCourseError } = useUpdateCourse();
  

    if (isCourseDetailsLoading) {
        return <h2>...isLoading</h2>
      }
      
      if (isCourseDetailsError) {
        return <h2>{courseDetailsError.message}</h2>
      }

      if (isUpdateCourseLoading) {
        return <h2>Loading...</h2>
      }
      
      if (isUpdateCourseError) {
        return (
          <>
        {console.log(updateCourseError.message)}
        </>
        )
      }
  
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
          courseId:courseId,
          title: titleInputElement.current?.value,
          description: descriptionInputElement.current?.value,
          weeks: weeksInputElement.current?.value,
          minimumSkill: minimumSkillInputElement.current?.value,
          tuition: tuitionInputElement.current?.value,
        };
        updateCourseMutate( data );
      };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Course</h1>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productInfoImg" />
                  <span className="productName">{courseDetails.data.data.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{courseDetails.data.data._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">description:</span>
                      <span className="productInfoValue">{courseDetails.data.data.description}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">weeks:</span>
                      <span className="productInfoValue">{courseDetails.data.data.weeks}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">tuition:</span>
                      <span className="productInfoValue">{courseDetails.data.data.tuition}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">minimumSkill:</span>
                      <span className="productInfoValue">{courseDetails.data.data.minimumSkill}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">createdAt:</span>
                      <span className="productInfoValue">{normalDate(courseDetails.data.data.createdAt)}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm" onSubmit={handleSubmit}>
              <div className="productFormLeft">
                  <label>Title</label>
                  <input
                   type="text"
                   ref={titleInputElement}
                   defaultValue={courseDetails.data.data.title}
                     />
                  <label>Description</label>
                  <input
                   type="text"
                   ref={descriptionInputElement}
                   defaultValue={courseDetails.data.data.description}
                     />
                  <label>Weeks</label>
                  <input
                   type="number"
                   ref={weeksInputElement}
                   defaultValue={courseDetails.data.data.weeks}
                     />
                  <label>Tuition</label>
                  <input
                   type="number"
                   ref={tuitionInputElement}
                   defaultValue={courseDetails.data.data.tuition}
                     />
                  <label>MinimumSkill</label>
                  <select
                   name="minimumSkill"
                    id="idMinimumSkill"
                    ref={minimumSkillInputElement}
                   defaultValue={courseDetails.data.data.minimumSkill}
                    >
                      <option value="beginner">beginner</option>
                      <option value="intermediate">intermediate</option>
                      <option value="advance">advance</option>
                  </select>
                  <label>ScholarshipAvailable</label>
                  <select
                   name="scholarshipAvailable"
                    id="idScholarshipAvailable"
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
