import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAcademies } from '../redux/apiCalls/academyApiCalls';
import Academy from './Academy';
import Loader from './Loader';

const Academies = () => {

    const [isLoading, setIsLoading] = useState(true);
  const {academyData} = useSelector((state) => state.academySlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (academyData.length === 0) {
      dispatch(getAcademies())
        .then(() => setIsLoading(false))
        .catch((err) => console.error(err));
    } else {
      setIsLoading(false);
    }
  }, [dispatch, academyData]);

  console.log(academyData)

  return (
    <>
      {isLoading && <Loader/>}
      {!isLoading && academyData && (
        academyData.data.map((academy)=>(
            <Academy key={academy._id} academy={academy}/>
        ))
      )}
    </>
  )
}

export default Academies