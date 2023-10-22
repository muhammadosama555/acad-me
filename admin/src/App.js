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
import { QueryClientProvider,QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useSelector } from "react-redux";
import OrderList from "./pages/orderList/OrderList";
import Order from "./pages/order/Order";


const queryClient = new QueryClient()

function App() {

  const { currentUser } = useSelector((state) => state.userSlice);

  console.log(currentUser?.data)

  return (
    <>
      <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    {currentUser?.data.role === 'admin'  ? ( 
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
          <Route path="/orders" element={<OrderList/>}></Route>
          <Route path="/order/:orderId" element={<Order/>}></Route>
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
