import { useRef } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../apiCalls/userApiCalls";
import Loader from "../components/Loader";

const Login = () => {
  const emailInputElement = useRef();
  const passwordInputElement = useRef();
  const { mutate:loginMutate, isLoading:isLoginLoading, isError:isLoginError, error:loginError } = useLogin();

  
  if (isLoginLoading) {
    return <Loader/>
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: emailInputElement.current?.value,
      password: passwordInputElement.current?.value,
    };
    loginMutate( data );
  };

  return (
    <>
    <div className="login flex justify-center mt-20">
        <div className="bg-white shadow-xl px-8 pt-10 pb-5 mx-6 rounded-md w-[360px] sm:w-[450px] md:w-[500px] lg:w-[500px] xl:w-[500px]">
            <form className="" onSubmit={handleSubmit}>
                <h1 className="text-4xl font-semibold pb-5">Login</h1>
                <div className="flex flex-col gap-5 mb-3">
                    <div className="flex flex-col">
                        <label className="text-xl pb-2" for="email_field">Email</label>
                        <input
                         type="email"
                          id="email_field"
                           className="px-3 py-3 rounded-md shadow-md focus:shadow-md"
                             placeholder="Enter your email"
                             name="email"
                             ref={emailInputElement}
                             />
                    </div>
    
                    <div className="flex flex-col ">
                        <label className="text-xl pb-2" for="password_field">Password</label>
                        <input
                         type="password"
                          id="password_field"
                           className="px-3 py-3 rounded-md shadow-md focus:shadow-md"
                             placeholder="Password"
                             name="password"
                             ref={passwordInputElement}
                              />
                    </div>
                </div>
                <a href="#" className="flex text-blue-400 font-semibold justify-end mb-4 hover:text-red-color">Forgot Password?</a>

                <div className="flex justify-center mt-5 pb-3">
                    <button
                        className="text-white font-semibold bg-red-color w-full py-4 rounded-md bg-[#4a4cc7] hover:bg-[#4647ab] hover:transition-all"
                        id="register_button" type="submit">LOGIN</button>
                </div>
                {isLoginError &&
                <div>
                  <p className='text-red-600'>{loginError.response.data.error}</p>
                </div>
                }
                <Link to="/register" className="flex justify-end mb-4 hover:text-red-color">New User?</Link>
            </form>
        </div>
    </div>












    {/* <form onSubmit={handleSubmit}>
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
    </form> */}
    </>
  );
};

export default Login;
