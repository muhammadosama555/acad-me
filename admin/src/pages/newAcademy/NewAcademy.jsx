import { useRef } from "react";
import { useParams } from "react-router-dom";
import { usePostAcademy } from "../../apiCalls/academyApiCalls";
import "./newAcademy.css";
import Loader from '../../components/Loader'

export default function NewAcademy() {

  const nameInputElement = useRef();
  const descriptionInputElement = useRef();
  const websiteInputElement = useRef();
  const phoneInputElement = useRef();
  const emailInputElement = useRef();
  const addressInputElement = useRef();
  const housingInputElement = useRef();

  const { mutate:postAcademyMutate, isLoading:isPostAcademyLoading, isError:isPostAcademyError, error:postAcademyError } = usePostAcademy();


  if (isPostAcademyLoading) {
    return <Loader/>
  }

  if (isPostAcademyError) {
    return (
      <>
        <h2>{postAcademyError.response.data.error}</h2>
      </>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: nameInputElement.current?.value,
      description: descriptionInputElement.current?.value,
      website: websiteInputElement.current?.value,
      phone: phoneInputElement.current?.value,
      email: emailInputElement.current?.value,
      address: addressInputElement.current?.value,
      housing: housingInputElement.current?.value,
    };
    postAcademyMutate(data);
    console.log(data);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Academy</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input
           type="text"
            placeholder="Outary Skills"
            ref={nameInputElement}
             />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
           type="text"
            placeholder="the offical academy of pakistan"
            ref={descriptionInputElement}
             />
        </div>
        <div className="addProductItem">
          <label>Website</label>
          <input
           type="text"
            placeholder="www.outray.com"
            ref={websiteInputElement}
             />
        </div>
        <div className="addProductItem">
          <label>Phone</label>
          <input
           type="text"
            placeholder="+8912376913"
            ref={phoneInputElement}
             />
        </div>
        <div className="addProductItem">
          <label>Email</label>
          <input
           type="email"
            placeholder="outray@gmail.com"
            ref={emailInputElement}
             />
        </div>
        <div className="addProductItem">
          <label>Address</label>
          <input
           type="text"
            placeholder="22no, dhaymial camp"
            ref={addressInputElement}
             />
        </div>
        <div className="addProductItem">
          <label>Housing</label>
          <select
           name="housing"
            id="housing"
            ref={housingInputElement}
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
