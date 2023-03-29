import { useRef } from "react";
import { usePostUser } from "../../apiCalls/userApiCalls";
import "./newUser.css";

export default function NewUser() {

  const nameInputElement = useRef();
  const emailInputElement = useRef();
  const passwordInputElement = useRef();

  const { mutate:postUserMutate, isLoading:isPostUserLoading, isError:isPostUserError , error:postUserError } = usePostUser()

  if (isPostUserLoading) {
    return <h2>Loading...</h2>;
  }

  if (isPostUserError) {
    return (
      <>
        <h2>{postUserError.message}</h2>
      </>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: nameInputElement.current?.value,
      email: emailInputElement.current?.value,
      password: passwordInputElement.current?.value,
    };
    postUserMutate(data);
    console.log(data);
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label>Username</label>
          <input
           type="text"
          placeholder="john"
          ref={nameInputElement}
           />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
           type="email"
          placeholder="john@gmail.com"
          ref={emailInputElement}
           />
        </div>
        <div className="newUserItem">
          <label>password</label>
          <input
           type="password"
            placeholder="******"
            ref={passwordInputElement}
             />
        </div>
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
