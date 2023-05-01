import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";

import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import NewProduct from "./pages/newAcademy/NewAcademy";
import Login from "./pages/login/Login";
import AcademyList from "./pages/academyList/AcademyList";
import Academy from "./pages/academy/Academy";
import Course from "./pages/course/Course";
import NewCourse from "./pages/newCourse/NewCourse";
import { useGetUser } from "./apiCalls/userApiCalls";






function App() {

  const { isLoading:isUserLoading, data:user, isError:isUserError , error:userError } = useGetUser()

  console.log(user)

  return (
    <>
    
    <BrowserRouter>
    {user?.data.role == "admin" ? ( 
    <>
    <Topbar />
          <div className="container">
          <Sidebar />
          <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/users" element={<UserList />}></Route>
          <Route path="/user/:userId" element={<User />}></Route>
          <Route path="/newUser" element={<NewUser />}></Route>
          <Route path="/acadamies" element={<AcademyList />}></Route>
          <Route path="/academy/:academyId" element={<Academy />}></Route>
          <Route path="/newAcademy" element={<NewProduct />}></Route>
          <Route path="/course/:courseId" element={<Course />}></Route>
          <Route path="/newCourse/:academyId" element={<NewCourse />}></Route>
        </Routes>
        </div>
    </>
    ) : (
      <Login />
    )
    }
          
  </BrowserRouter>

  </>
  );
}

export default App;
