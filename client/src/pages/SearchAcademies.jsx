import { Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useGetAcademies } from '../apiCalls/academyApiCalls'
import Academy from '../components/Academy'

const SearchAcademies = () => {
   
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState("");
    const limit = 5
    const {isLoading,data} = useGetAcademies(currentPage,limit,keyword)


  return (
    <>
     <div className="absolute mx-8 sm:mx-8 md:mx-8 lg:mx-0 xl:mx-0 ">
        <i className="fa-solid fa-list"></i>
    </div>
    <div className="search-content flex sm:mx-8 md:mx-8">
        <div className="left hidden sm:hidden md:hidden lg:flex lg:flex-col xl:flex xl:flex-col filters side-bar w-[300px]">
            <div className="filters">
                <h1 className="text-4xl text-center py-3">Filters</h1>
            </div>
            <div className="category pl-6 pb-4 border-t border-gray-200">
                <h1 className="text-2xl py-3">Category</h1>
                <div className="flex flex-col gap-2 py-2 pl-4">
                    <div className="flex gap-3">
                        <input className="w-4" type="checkbox"/>
                        <label for="text">Category 1</label>
                    </div>
                    <div className="flex gap-3">
                        <input className="w-4" type="checkbox"/>
                        <label for="text">Category 2</label>
                    </div>
                    <div className="flex gap-3">
                        <input className="w-4" type="checkbox"/>
                        <label for="text">Category 3</label>
                    </div>
                    <div className="flex gap-3">
                        <input className="w-4" type="checkbox"/>
                        <label for="text">Category 4</label>
                    </div>
                    <div className="flex gap-3">
                        <input className="w-4" type="checkbox"/>
                        <label for="text">Category 5</label>
                    </div>
                    <div className="flex gap-3">
                        <input className="w-4" type="checkbox"/>
                        <label for="text">Category 6</label>
                    </div>
                    
                </div>
            </div>
            <div className="rating pl-6 py-4 border-t border-b border-gray-200">
                <h1 className="text-2xl pb-3">Rating</h1>
                <div className="rating">
                    <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
                    <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
                    <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
                    <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star-half-stroke"></i>
                    <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i>
                </div>
            </div>
            <div className="sort pl-6 py-4">
                <h1 className="text-2xl py-3">Sort</h1>
                <div className="flex flex-col gap-2 py-2 pl-4">
                    <div className="flex gap-3">
                        <input className="w-4" type="checkbox"/>
                        <label for="text">Category 1</label>
                    </div>
                    <div className="flex gap-3">
                        <input className="w-4" type="checkbox"/>
                        <label for="text">Category 2</label>
                    </div>
                    <div className="flex gap-3">
                        <input className="w-4" type="checkbox"/>
                        <label for="text">Category 3</label>
                    </div>
                </div>
            </div>
        </div>

        <div className="right box-border pt-4 w-full">
        <div className="search-bar w-full px-20 flex">
          <input
             onChange={(e)=>setKeyword(e.target.value)}
            className="px-6 py-3 w-full text-lg bg-slate-100 rounded-full "
            type="text"
            placeholder="Search for Academies"
          />
        </div>
            <div className="flex flex-wrap gap-10 justify-center mt-10">
            
            <div className="academies mt-14 ">
        <div className="flex justify-center lg:justify-between xl:justify-between head mb-14">
            <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold"> Academies</h1>
            <div className="hidden lg:flex xl:flex gap-5">
                <select className="text-2xl text-slate-400 " name="design" id="design">
                    <option value="">Design</option>
                    <option value="">Animation</option>
                </select>
                <div className="flex gap-5">
                    <div className="left bg-slate-50 rounded-full h-12 w-12 flex justify-center items-center text-lg hover:bg-yellow-400"><i className="fa-solid fa-chevron-left"></i></div>
                    <div className="right bg-slate-50 rounded-full h-12 w-12 flex justify-center items-center text-lg hover:bg-yellow-400"><i className="fa-solid fa-chevron-right"></i></div>
                </div>
            </div>

        </div>
        <div className="flex flex-col lg:justify-center lg:flex-wrap lg:flex-row xl:justify-center xl:flex-wrap xl:flex-row gap-10 lg:gap-8 items-center">
{isLoading ? <Spinner/> :(
    <>
     {data?.data.data.map((academy)=>(
      <Academy key={academy._id} academy={academy} />
    ))}
    </>
)}
   
     </div>
    </div>
    {isLoading ? <Spinner/> :(
    <>
 {data?.data.data.length > 4 &&
     <div>
      {data.data.pagination.prev && <button onClick={()=>setCurrentPage(data.data.pagination.prev?.page)}>previous</button>}
      <div>{currentPage}</div>
      {data.data.pagination.next && <button onClick={()=>setCurrentPage(data.data.pagination.next?.page)}>next</button>}
    </div> 
}
</>
)}
   
            </div>
           
        </div>
    </div>
    </>
  )
}

export default SearchAcademies