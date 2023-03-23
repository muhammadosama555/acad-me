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

const queryClient = new QueryClient()

function App() {
  
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/academydetails/:academyId' element={<AcademyDetails/>}/>
    <Route path='/coursedetails/:courseId' element={<CourseDetails/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/listacademy' element={<ListAcademy/>}/>
    <Route path='/listcourse/:academyId' element={<ListCourse/>}/>
    <Route path='/updateacademy/:academyId' element={<UpdateAcademy/>}/>
    <Route path='/updatecourse/:courseId' element={<UpdateCourse/>}/>
    </Routes>
    <Footer />
    </BrowserRouter>
    <ReactQueryDevtools intialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
    </>
  );
}

export default App;
