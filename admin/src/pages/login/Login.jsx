import { useRef } from "react";
import { useGetAcadimies, useLogin } from "../../apiCalls/userApiCalls";


const Login = () => {
  const emailInputElement = useRef();
  const passwordInputElement = useRef();

  const { mutate, isLoading, isError, error, } = useLogin();



  
  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return (
      <>
    <h2>{error.message}</h2>
    </>
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: emailInputElement.current?.value,
      password: passwordInputElement.current?.value,
    };
    mutate( data );
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        ref={emailInputElement}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        ref={passwordInputElement}
        required
      />
     <button type="submit">LogIn</button>
    </form>
  );
};

export default Login;
