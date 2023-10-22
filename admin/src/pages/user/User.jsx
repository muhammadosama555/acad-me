import {
  CalendarToday,
  MailOutline,
  Publish,
} from "@material-ui/icons";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUserDetails, useUpdateUser } from "../../apiCalls/userApiCalls";
import normalDate from "../../utils";
import "./user.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useDeleteOrder } from "../../apiCalls/orderApiCalls";
import Loader from '../../components/Loader'

export default function User() {

  const nameInputElement = useRef();
  const emailInputElement = useRef();
  const roleInputElement = useRef();
 
  const { userId } = useParams()
  const { isLoading:isUserLoading, data:userDetails, isError:isUserError , error:userError, } = useGetUserDetails(userId)
  const { mutate:updateUserMutate, isLoading:isUpdateUserLoading, isError:isUpdateUserError, error:updateUserError} = useUpdateUser(userId);
  const {mutate, isLoading, isError, error} = useDeleteOrder();

  if (isUserLoading) {
    return <Loader/>
  }

  if (isUserError) {
    return (
      <>
        <h2>{userError.message}</h2>
      </>
    );
  }
  
  if (isUpdateUserLoading) {
    return <Loader/>
  }

  if (isUpdateUserError) {
    return (
      <>
        <h2>{updateUserError.message}</h2>
      </>
    );
  }
  if (isLoading) {
    return <Loader/>
  }
  
  if (isError) {
    return <h2>{error.message}</h2>
  }
  
    const handleDelete = (orderId) => {
       mutate(orderId)
    };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      userId: userId,
      name: nameInputElement.current?.value,
      email: emailInputElement.current?.value,
      role: roleInputElement.current?.value,
    };
    updateUserMutate(data);
    console.log(data);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 }, 
    { field: "totalAmount", headerName: "Total", width: 250 },
    { field: "paymentStatus", headerName: "Payment", width: 250 },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row._id}>
              <button className="orderListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="orderListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];


  return (
    <>
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{userDetails.data.data.name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{normalDate(userDetails.data.data.createdAt)}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{userDetails.data.data.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  ref={nameInputElement}
                  defaultValue={userDetails.data.data.name}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  ref={emailInputElement}
                  defaultValue={userDetails.data.data.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Role</label>
                <input
                  type="text"
                  ref={roleInputElement}
                  defaultValue={userDetails.data.data.role}
                  className="userUpdateInput"
                />
              </div>
            
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    
    </div>
{userDetails?.data.data.orders.length > 0 ? 
<div className="orderList">
<DataGrid
  rows={userDetails?.data.data.orders}
  getRowId={(row) => row._id}
  disableSelectionOnClick
  columns={columns}
  pageSize={8}
  checkboxSelection
/>
</div> : null}
</>
  );
}
