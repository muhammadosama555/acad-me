import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAcademyDetails,
  useUpdateAcademy,
} from "../apiCalls/academyApiCalls";
import Loader from "../components/Loader";

const UpdateAcademy = () => {
  const nameInputElement = useRef();
  const descriptionInputElement = useRef();
  const websiteInputElement = useRef();
  const phoneInputElement = useRef();
  const emailInputElement = useRef();
  const addressInputElement = useRef();
  const housingInputElement = useRef();
 const jobAssistanceInputElement = useRef();
 const jobGuranteeInputElement = useRef();
 const acceptGiInputElement = useRef();
  const { academyId } = useParams();

  const { mutate:updateAcademyMutate, isLoading:isUpdateAcademyLoading, isError:isUpdateAcademyError, error:updateAcademyError } = useUpdateAcademy(academyId);

  const { isLoading:isAcademyLoading, data:academyDetails } = useGetAcademyDetails(academyId);

  if (isAcademyLoading) {
    return <Loader/>
  }

  if (isUpdateAcademyLoading) {
    return <Loader/>
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      academyId: academyId,
      name: nameInputElement.current?.value,
      description: descriptionInputElement.current?.value,
      website: websiteInputElement.current?.value,
      phone: phoneInputElement.current?.value,
      email: emailInputElement.current?.value,
      address: addressInputElement.current?.value,
      housing: housingInputElement.current?.checked,
      jobAssistance: jobAssistanceInputElement.current?.checked,
      jobGurantee: jobGuranteeInputElement.current?.checked,
      acceptGi: acceptGiInputElement.current?.checked,
    };
    updateAcademyMutate(data);
    console.log(data);
  };

  return (
    <>
        <div class="flex justify-center">
        <div class="flex flex-col w-[600px] mt-20 shadow-lg py-10 mx-8 px-5 lg:px-10 xl:px-10">
            <h1 class="text-2xl font-bold text-center pb-8">Update Academy</h1>
            <form action="" class="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
                <div class="flex flex-col gap-2">
                    <label class="text-xl font-semibold" for="name">Name:</label>
                    <input
                     class="text-lg px-2 py-1 border border-gray-400 rounded-sm"
                      type="text"
                      name="name"
                      ref={nameInputElement}
                      defaultValue={academyDetails.data.data.name}
                      />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-xl font-semibold" for="description">Description:</label>
                    <input
                     class="text-lg px-2 py-1 border border-gray-400 rounded-sm"
                      type="text"
                      name="description"
                      ref={descriptionInputElement}
                      defaultValue={academyDetails.data.data.description}
                      />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-xl font-semibold" for="website">Website:</label>
                    <input
                     class="text-lg px-2 py-1 border border-gray-400 rounded-sm"
                      type="text"
                      name="website"
                      ref={websiteInputElement}
                      defaultValue={academyDetails.data.data.website}
                      />
                </div>
                <div class="flex gap-2">
                    <label class="text-xl font-semibold" for="housing">Housing</label> 
                    <input
                     type="checkbox"
                      name="housing"
                      ref={housingInputElement}
                      defaultChecked={academyDetails.data.data.housing}
                      />
                
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-xl font-semibold" for="Job-ass">Job Assistance:</label>
                    <input
                     type="checkbox"
                      name="jobAssistance"
                      ref={jobAssistanceInputElement}
                      defaultChecked={academyDetails.data.data.jobAssistance}
                      />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-xl font-semibold" for="Job-GT">Job Guarantee:</label>
                    <input
                     type="checkbox"
                      name="jobGurantee"
                      ref={jobGuranteeInputElement}
                      defaultChecked={academyDetails.data.data.jobGurantee}
                      />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-xl font-semibold" for="acceptG">Accept Gi:</label>
                    <input
                     type="checkbox"
                      name="acceptGi"
                      ref={acceptGiInputElement}
                      defaultChecked={academyDetails.data.data.acceptGi}
                      />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-xl font-semibold" for="phone">Phone:</label>
                    <input
                     class="text-lg outline-none"
                      type="text"
                      name="phone"
                      ref={phoneInputElement}
                      defaultValue={academyDetails.data.data.phone}
                      />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-xl font-semibold" for="email">Email:</label>
                    <input
                     class="text-lg outline-none"
                     type="text"
                     name="email"
                    ref={emailInputElement}
                    defaultValue={academyDetails.data.data.email}
                      />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-xl font-semibold" for="address">Address:</label>
                    <input class="text-lg outline-none"
                     type="text"
                     name="address"
                     ref={addressInputElement}
                     defaultValue={academyDetails.data.data.address}
                      />
                </div>
                {isUpdateAcademyError &&
                <div>
                  <p className='text-red-600'>{updateAcademyError.response.data.error}</p>
                </div>
                }
                <div class="flex justify-center">
                    <button class="px-10 xl:px-20 lg:px-20 py-3 text-sm md:text-lg lg:text-lg xl:text-lg text-white font-semibold rounded-lg bg-[#4a4cc7] hover:bg-[#4647ab]">Update</button>
                </div>
            </form>
        </div>
    </div>











{/* 
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        ref={nameInputElement}
        defaultValue={academyDetails.data.data.name}
        required
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        ref={descriptionInputElement}
        defaultValue={academyDetails.data.data.description}
        required
      />
      <label htmlFor="website">website</label>
      <input
        type="text"
        name="website"
        ref={websiteInputElement}
        defaultValue={academyDetails.data.data.website}
        required
      />
      <label htmlFor="phone">phone</label>
      <input
        type="number"
        name="phone"
        ref={phoneInputElement}
        defaultValue={academyDetails.data.data.phone}
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        ref={emailInputElement}
        defaultValue={academyDetails.data.data.email}
        required
      />
      <label htmlFor="address">Address</label>
      <input
        type="text"
        name="address"
        ref={addressInputElement}
        defaultValue={academyDetails.data.data.address}
        required
      />
      <button type="submit">UpdateAcademy</button>
    </form> */}
    </>
  );
};

export default UpdateAcademy;
