import React, { useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useGetCourseDetails, useUpdateCourse } from '../apiCalls/courseApiCalls';
import Loader from '../components/Loader';

const UpdateCourse = () => {

  const { courseId } = useParams()
  console.log(courseId)

  const titleInputElement = useRef();
  const descriptionInputElement = useRef();
  const weeksInputElement = useRef();
  const minimumSkillInputElement = useRef();
  const tuitionInputElement = useRef();
  const scholarshipAvailableInputElement = useRef();

  const { isLoading:isCourseDetailsLoading,data:courseDetails,isError:isCourseDetailsError,error:courseDetailsError } = useGetCourseDetails(courseId)
  const { mutate:updateCourseMutate, isLoading:isUpdateCourseLoading, isError:isUpdateCourseError, error:updateCourseError, isSuccess } = useUpdateCourse();
  
    
  if (isUpdateCourseLoading) {
    return <Loader/>
  }
  
  

  if (isCourseDetailsLoading) {
    return <Loader/>
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
      scholarshipAvailable: scholarshipAvailableInputElement.current?.checked,
    };
    updateCourseMutate( data );
  };

  return (
    <>
    <div class="flex justify-center">
        <div class="flex flex-col w-[600px] mt-20 shadow-lg py-10 mx-8 px-5 lg:px-10 xl:px-10">
            <h1 class="text-2xl font-bold text-center pb-8">Update Course</h1>
            <form action="" class="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div class="flex flex-wrap gap-2">
                    <label class="text-xl font-semibold" for="title">Title:</label>
                    <input
                     class="text-lg outline-none"
                      type="text"
                      name="title"
                      ref={titleInputElement}
                      defaultValue={courseDetails.data.data.title}
                      />
                </div>
                <div class="flex flex-wrap gap-2">
                    <label class="text-xl font-semibold" for="description">Description:</label>
                    <input
                     class="text-lg outline-none"
                      type="text"
                      name="description"
                      ref={descriptionInputElement}
                      defaultValue={courseDetails.data.data.description}
                      />
                </div>
                <div class="flex flex-wrap gap-2">
                    <label class="text-xl font-semibold" for="weeks">Weeks:</label>
                    <input
                     class="text-lg outline-none"
                      type="number"
                      name="weeks"
                      ref={weeksInputElement}
                      defaultValue={courseDetails.data.data.weeks}
                      />
                </div>
                <div class="flex flex-wrap gap-2">
                    <label class="text-xl font-semibold" for="skill">Minimum Skill:</label>
                    <select
                     class="text-lg"
                     name="minimumSkill"
                     id="idMinimumSkill"
                     ref={minimumSkillInputElement}
                     defaultValue={courseDetails.data.data.minimumSkill}
                     >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advance">Advance</option>
                    </select>
                </div>
                <div class="flex flex-wrap gap-2 ">
                    <label class="text-xl font-semibold" for="title">Tuition:</label>
                    <input
                     class="text-lg outline-none"
                      type="text"
                      name="tuition"
                      ref={tuitionInputElement}
                      defaultValue={courseDetails.data.data.tuition}
                      />
                </div>
                <div class="flex flex-wrap gap-2 items-center">
                    <label class="text-xl font-semibold" for="title">Scholorship Available:</label>
                    <input
                     type="checkbox"
                      name="scholarshipAvailable"
                      ref={scholarshipAvailableInputElement}
                      defaultChecked={courseDetails.data.data.scholarshipAvailable}
                      />
                </div>
                {isUpdateCourseError &&
                <div>
                  <p className='text-red-600'>{updateCourseError.response.data.error}</p>
                </div>
                }
                <div class="flex justify-center">
                    <button class="px-10 xl:px-20 lg:px-20 py-3 text-sm md:text-lg lg:text-lg xl:text-lg text-white font-semibold rounded-lg bg-[#4a4cc7] hover:bg-[#4647ab]">Update</button>
                </div>
            </form>
        </div>
    </div>
















    {/* <form onSubmit={handleSubmit}>
    <label htmlFor="title">Title</label>
    <input
      type="text"
      name="title"
      ref={titleInputElement}
      defaultValue={courseDetails.data.data.title}
      required
    />
    <label htmlFor="description">Description</label>
    <input
      type="text"
      name="description"
      ref={descriptionInputElement}
      defaultValue={courseDetails.data.data.description}
      required
    />
    <label htmlFor="weeks">Weeks</label>
    <input
      type="number"
      name="weeks"
      ref={weeksInputElement}
      defaultValue={courseDetails.data.data.weeks}
      required
    />
    <label htmlFor="minimumSkill">minimumSkill</label>
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

    <label htmlFor="tuition">Tuition</label>
    <input
      type="text"
      name="tuition"
      ref={tuitionInputElement}
      defaultValue={courseDetails.data.data.tuition}
      required
    />

   <button type="submit">UpdateCourse</button>
  </form> */}
  </>
  )
}

export default UpdateCourse