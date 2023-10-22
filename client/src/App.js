import Home from './pages/Home';
import "./App.css";
import { QueryClientProvider,QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AcademyDetails from './pages/AcademyDetails';
import CourseDetails from './pages/CourseDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import ListAcademy from './pages/ListAcademy';
import ListCourse from './pages/ListCourse';
import UpdateAcademy from './pages/UpdateAcademy';
import UpdateCourse from './pages/UpdateCourse';
import SearchAcademies from './pages/SearchAcademies';
import SearchCourses from './pages/SearchCourses';
import { ScrollToTop } from "./hooks/ScrollToTop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import ConfirmOrder from './pages/ConfirmOrder';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import ForgetPassword from './pages/ForgetPassword';

const queryClient = new QueryClient()

function App() {
  
  return (
    <div className="relative lg:mx-14 xl:mx-32">
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <ScrollToTop />
    <Navbar />
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/academydetails/:academyId' element={<AcademyDetails/>}/>
    <Route path='/coursedetails/:courseId/:academyId' element={<CourseDetails/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/listacademy' element={<ListAcademy/>}/>
    <Route path='/listcourse/:academyId' element={<ListCourse/>}/>
    <Route path='/updateacademy/:academyId' element={<UpdateAcademy/>}/>
    <Route path='/updatecourse/:courseId' element={<UpdateCourse/>}/>
    <Route path='/searchacademies' element={<SearchAcademies/>}/>
    <Route path='/searchcourses' element={<SearchCourses/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/order/shipping' element={<Shipping/>}/>
    <Route path='/order/confirmOrder' element={<ConfirmOrder/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/changePassword' element={<ChangePassword/>}/>
    <Route path='/forgetPassword' element={<ForgetPassword/>}/>
    </Routes>
    <div id='contactUs'>
    <Footer />
    </div>
    <ToastContainer
          autoClose={3000}
          draggable={false}
          position="top-right"
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnHover
        />
    </BrowserRouter>
    <ReactQueryDevtools intialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
    </div>
  );
}

export default App;
