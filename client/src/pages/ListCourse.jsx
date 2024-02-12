import React, { useRef } from 'react'
import { useParams } from 'react-router-dom';
import { usePostCourse } from '../apiCalls/courseApiCalls';
import Loader from '../components/Loader';

const ListCourse = () => {

    const { academyId } = useParams()
    console.log(academyId)

    const titleInputElement = useRef();
    const descriptionInputElement = useRef();
    const weeksInputElement = useRef();
    const minimumSkillInputElement = useRef();
    const tuitionInputElement = useRef();
    const scholarshipAvailableInputElement = useRef();
    const imageInputElement = useRef();
    
      
    const { mutate:postCourseMutate, isLoading:isPostCourseLoading, isError:isPostCourseError, error:postCourseError } = usePostCourse();
    
      
    if (isPostCourseLoading) {
      return <Loader/>
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
        scholarshipAvailable: scholarshipAvailableInputElement.current?.checked,
        image: imageInputElement.current?.files[0],
      };
      console.log(data)
      postCourseMutate( data );
    };
    

  return (
    <>
   <div class="flex justify-center">
        <div class="flex flex-col w-[600px] mt-20 shadow-lg py-10 mx-8 px-5 lg:px-10 xl:px-10">
            <h1 class="text-2xl font-bold text-center pb-8">List Course</h1>
            <form class="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div class="flex flex-wrap gap-2">
                    <label class="text-xl font-semibold" for="title">Title:</label>
                    <input
                     class="text-lg outline-none"
                      type="text"
                      name="title"
                      ref={titleInputElement}
                      />
                </div>
                <div class="flex flex-wrap gap-2">
                    <label class="text-xl font-semibold" for="description">Description:</label>
                    <input
                     class="text-lg outline-none"
                      type="text"
                      name="description"
                      ref={descriptionInputElement}
                      />
                </div>
                <div class="flex flex-wrap gap-2">
                    <label class="text-xl font-semibold" for="weeks">Weeks:</label>
                    <input
                     class="text-lg outline-none"
                      type="number"
                      name="weeks"
                      ref={weeksInputElement}
                      />
                </div>
                <div class="flex flex-wrap gap-2">
                    <label class="text-xl font-semibold" for="skill">Minimum Skill:</label>
                    <select
                     class="text-lg"
                     name="minimumSkill"
                     id="idMinimumSkill"
                     ref={minimumSkillInputElement}
         
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
                      />
                </div>
                <div class="flex flex-wrap gap-2 items-center">
                    <label class="text-xl font-semibold" for="title">Scholorship Available:</label>
                    <input
                     type="checkbox"
                      name="scholarshipAvailable"
                      ref={scholarshipAvailableInputElement}
                      />
                </div>
                <div className="flex flex-col gap-2">
               
               <input
           type="file"
           id="file"
           accept="image/*"
           ref={imageInputElement}
           name="image"
         />
           </div>
                {isPostCourseError &&
                <div>
                  <p className='text-red-600'>{postCourseError.response.data.error}</p>
                </div>
                }
                <div class="flex justify-center">
                    <button class="px-10 xl:px-20 lg:px-20 py-3 text-sm md:text-lg lg:text-lg xl:text-lg text-white font-semibold rounded-lg bg-[#4a4cc7] hover:bg-[#4647ab]">List</button>
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
      required
    />
    <label htmlFor="description">Description</label>
    <input
      type="text"
      name="description"
      ref={descriptionInputElement}
      required
    />
    <label htmlFor="weeks">Weeks</label>
    <input
      type="number"
      name="weeks"
      ref={weeksInputElement}
      required
    />
    <label htmlFor="minimumSkill">minimumSkill</label>
    <select
                   name="minimumSkill"
                    id="idMinimumSkill"
                    ref={minimumSkillInputElement}
        
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
      required
    />
    {isError && error.response.data.error}
    {isSuccess && alert("sucessfull")}
   <button type="submit">ListCourse</button>
  </form> */}
  </>
  )
}

export default ListCourse