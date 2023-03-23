import axios from "axios"
import { 
         getAcademySuccess,
         getAcademyDetailsSuccess,
         } from "../reducers/academyReducers";


//  get all Academies

  export const getAcademies = () => async (dispatch) => {
      const res = await axios.get("/api/v1/bootcamps/");
      dispatch(getAcademySuccess(res.data));
    
  };

//  get Academies Details

  export const getAcademyDetails = (id) => async (dispatch) => {
      const res = await axios.get(`/api/v1/bootcamps/${id}`);
      dispatch(getAcademyDetailsSuccess(res.data));
    
  };