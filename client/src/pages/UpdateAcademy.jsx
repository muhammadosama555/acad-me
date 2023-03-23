import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAcademyDetails,
  useUpdateAcademy,
} from "../apiCalls/academyApiCalls";

const UpdateAcademy = () => {
  const nameInputElement = useRef();
  const descriptionInputElement = useRef();
  const websiteInputElement = useRef();
  const phoneInputElement = useRef();
  const emailInputElement = useRef();
  const addressInputElement = useRef();
  const { academyId } = useParams();

  const { mutate, isLoading, isError, error } = useUpdateAcademy(academyId);

  const {
    isLoading: isAcademyLoading,
    data: academyDetails,
    isError: isAcademyError,
    error: academyError,
  } = useGetAcademyDetails(academyId);

  if (isAcademyLoading) {
    return <h2>Loading...</h2>;
  }

  if (isAcademyError) {
    return (
      <>
        <h2>{academyError.message}</h2>
      </>
    );
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return (
      <>
        <h2>{error.message}</h2>
      </>
    );
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
    };
    mutate(data);
    console.log(data);
  };

  return (
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
    </form>
  );
};

export default UpdateAcademy;
