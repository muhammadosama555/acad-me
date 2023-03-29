import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import { QueryClientProvider,QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import NewProduct from "./pages/newAcademy/NewAcademy";
import Login from "./pages/login/Login";
import AcademyList from "./pages/academyList/AcademyList";
import Academy from "./pages/academy/Academy";

const queryClient = new QueryClient()


function App() {
  const user = JSON.parse(localStorage.getItem("user")) || null
  console.log(user?.data.role)

  return (
    <>
    <QueryClientProvider client={queryClient}>
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
        </Routes>
        </div>
    </>
    ) : (
      <Login />
    )
    }
          
  </BrowserRouter>
  <ReactQueryDevtools intialIsOpen={false} position="bottom-right" />
  </QueryClientProvider>
  </>
  );
}

export default App;
