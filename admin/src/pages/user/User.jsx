import {
  CalendarToday,
  MailOutline,
  Publish,
} from "@material-ui/icons";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetUserDetails, useUpdateUser } from "../../apiCalls/userApiCalls";
import normalDate from "../../utils";
import "./user.css";

export default function User() {

  const nameInputElement = useRef();
  const emailInputElement = useRef();
  const roleInputElement = useRef();
 
  const { userId } = useParams()
  const { isLoading:isUserLoading, data:userDetails, isError:isUserError , error:userError, } = useGetUserDetails(userId)
  const { mutate:updateUserMutate, isLoading:isUpdateUserLoading, isError:isUpdateUserError, error:updateUserError} = useUpdateUser(userId);

  if (isUserLoading) {
    return <h2>Loading...</h2>;
  }

  if (isUserError) {
    return (
      <>
        <h2>{userError.message}</h2>
      </>
    );
  }
  
  if (isUpdateUserLoading) {
    return <h2>Loading...</h2>;
  }

  if (isUpdateUserError) {
    return (
      <>
        <h2>{updateUserError.message}</h2>
      </>
    );
  }


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


  return (
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
  );
}
