import React, { useState } from 'react'
import { useGetAcadimies } from '../apiCalls/academyApiCalls'
import Academy from './Academy'

const Academies = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const {isLoading,data,isError,error} = useGetAcadimies(currentPage)

    if (isLoading) {
      return <h2>...isLoading</h2>
    }
    
    if (isError) {
      return <h2>{error.message}</h2>
    }

   

  return (
    <>
    {data?.data.data.map((academy)=>(
      <Academy key={academy._id} academy={academy} />
    ))}
    <div>
      {data.data.pagination.prev && <button onClick={()=>setCurrentPage(data.data.pagination.prev?.page)}>previous</button>}
      <div>{currentPage}</div>
      {data.data.pagination.next && <button onClick={()=>setCurrentPage(data.data.pagination.next?.page)}>next</button>}
    </div>
    </>
  )
}

export default Academies