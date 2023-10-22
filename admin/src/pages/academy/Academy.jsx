import { Link, useParams } from "react-router-dom";
import "./academy.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useGetAcademyCourses, useGetAcademyDetails, useUpdateAcademy } from "../../apiCalls/academyApiCalls";
import normalDate from "../../utils";
import { useRef } from "react";
import { useDeleteCourse } from "../../apiCalls/courseApiCalls";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import Loader from '../../components/Loader'

export default function Academy() {

    const nameInputElement = useRef();
    const descriptionInputElement = useRef();
    const websiteInputElement = useRef();
    const phoneInputElement = useRef();
    const emailInputElement = useRef();
    const addressInputElement = useRef();
    const housingInputElement = useRef();

  
    const { academyId } = useParams()
    const { isLoading:isAcademyLoading, data:academyDetails, isError:isAcademyError , error :academyError } = useGetAcademyDetails(academyId)
    const { mutate:updateAcademyMutate, isLoading:isUpdateAcademyLoading, isError:isUpdateAcademyError, error:updateAcademyError } = useUpdateAcademy(academyId);
    const { isLoading:isCoursesLoading, data:coursesData, isError:isCoursesError , error:coursesError } = useGetAcademyCourses(academyId)
    const {mutate:deleteCourseMutate, isLoading:isDeleteCourseLoading, isError:isDeleteCourseError, error:deleteCourseError} = useDeleteCourse();
  
  
    if (isAcademyLoading) {
      return <Loader/>
    }
  
    if (isAcademyError) {
      return (
        <>
          <h2>{academyError.message}</h2>
        </>
      );
    }

    if (isUpdateAcademyLoading) {
      return <Loader/>
    }
  
    if (isUpdateAcademyError) {
      return (
        <>
          <h2>{updateAcademyError.message}</h2>
        </>
      );
    }

    if (isCoursesLoading) {
      return <Loader/>
    }
  
    if (isCoursesError) {
      return (
        <>
          <h2>{coursesError.message}</h2>
        </>
      );
    }

    if (isDeleteCourseLoading) {
      return <Loader/>
    }
    
    if (isDeleteCourseError) {
      return <h2>{deleteCourseError.message}</h2>
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
        housing: housingInputElement.current?.value,
      };
      updateAcademyMutate(data);
      console.log(data);
    };

    
      const deleteHandler = (courseId) => {
        deleteCourseMutate(courseId)
      };


      const columns = [
        { field: "_id", headerName: "ID", width: 90 },
        {
          field: "title",
          headerName: "Title",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="productListItem">
                <img className="productListImg" src={params.row.img} alt="" />
                {params.row.title}
              </div>
            );
          },
        },
        { field: "description", headerName: "Description", width: 200 },
        {
          field: "weeks",
          headerName: "Weeks",
          width: 120,
        },
        {
          field: "tuition",
          headerName: "Tuition",
          width: 160,
        },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                <Link to={"/course/" + params.row._id}>
                  <button className="productListEdit">Edit</button>
                </Link>
                <DeleteOutline
                  className="productListDelete"
                   onClick={() => deleteHandler(params.row._id)}
                />
              </>
            );
          },
        },
      ];
  
    
  return (
    <>
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Edit Academy</h1>
      </div>
      <div className="productTop">
        
          {academyDetails && (
            <div className="productTopRight">
            <div className="productInfoTop">
                <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productInfoImg" />
                <span className="productName">{academyDetails.data.data.name}</span>
            </div>
            <div className="productInfoBottom">
                <div className="productInfoItem">
                    <span className="productInfoKey">id:</span>
                    <span className="productInfoValue">{academyDetails.data.data._id}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">description:</span>
                    <span className="productInfoValue">{academyDetails.data.data.description}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">address:</span>
                    <span className="productInfoValue">{academyDetails.data.data.address}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">website:</span>
                    <span className="productInfoValue">{academyDetails.data.data.website}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">phone no:</span>
                    <span className="productInfoValue">{academyDetails.data.data.phone}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">email:</span>
                    <span className="productInfoValue">{academyDetails.data.data.email}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">created At:</span>
                    <span className="productInfoValue">{normalDate(academyDetails.data.data.createdAt)}</span>
                </div>
               
               
            </div>
        </div>
          )}
          
      </div>
      <div className="productBottom">
          <form className="productForm" onSubmit={handleSubmit}>
              <div className="productFormLeft">
                  <label>Academy Name</label>
                  <input
                   type="text"
                   name="name"
                   ref={nameInputElement}
                   defaultValue={academyDetails.data.data.name}
                    />
                  <label>Description</label>
                  <input
                   type="text"
                   name="description"
                   ref={descriptionInputElement}
                   defaultValue={academyDetails.data.data.description}
                    />
                  <label>Website</label>
                  <input
                   type="text"
                   name="website"
                   ref={websiteInputElement}
                   defaultValue={academyDetails.data.data.website}
                    />
                  <label>Phone No</label>
                  <input
                   type="number"
                   name="phone"
                   ref={phoneInputElement}
                   defaultValue={academyDetails.data.data.phone}
                    />
                  <label>Email</label>
                  <input
                   type="text"
                   name="email"
                   ref={emailInputElement}
                   defaultValue={academyDetails.data.data.email}
                    />
                  <label>Address</label>
                  <input
                   type="text"
                   name="address"
                   ref={addressInputElement}
                   defaultValue={academyDetails.data.data.address}
                    />
                  <label>Housing</label>
                  <select
                   name="housing"
                    id="idHousing"
                    ref={housingInputElement}
                    defaultValue={academyDetails.data.data.housing}
                    >
                      <option value="true">true</option>
                      <option value="false">false</option>
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
{coursesData?.data.data.length > 0 ? 
<div className="productList">
<div style={{ padding: "10px 0px" }}>
  <Link to={`/newCourse/${academyId}`}>
    <button className="userAddButton">Create</button>
  </Link>
</div>
<DataGrid
  rows={coursesData?.data.data}
  getRowId={(row) => row._id}
  disableSelectionOnClick
  columns={columns}
  pageSize={8}
  checkboxSelection
/>
</div>:null}
</>
  );
}
