import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import { getAcademyDetails } from '../redux/apiCalls/academyApiCalls';
import { useLocation } from "react-router-dom";


const AcademyDetails = () => {

    const [isLoading, setIsLoading] = useState(true);
    const {academyDetails} = useSelector((state) => state.academySlice);
    const details = academyDetails.data 
    const dispatch = useDispatch();
    const location = useLocation();
  const id = location.pathname.split("/")[2];
  console.log(id);
  
    useEffect(() => {
      if (!academyDetails) {
        dispatch(getAcademyDetails(id))
          .then(() => setIsLoading(false))
          .catch((err) => console.error(err));
      } else {
        setIsLoading(false);
      }
    }, [dispatch, academyDetails, id]);
  
    console.log(academyDetails)

  return (
    <>
    {isLoading && <Loader/>}
    {!isLoading && academyDetails && (
      <>
      <h1>{details.phone}</h1>
      </>
    )}
  </>
  )
}

export default AcademyDetails