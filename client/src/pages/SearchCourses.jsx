import React, { useRef, useState } from 'react'
import { useGetCourses } from '../apiCalls/courseApiCalls'
import Course from '../components/Course'
import useOutsideClick from "../hooks/useOutsideClick";
import {
    Close,
  } from "@mui/icons-material";
import Loader from '../components/Loader';

const SearchCourses = () => {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [openFilter, setOpenFilter] = useState(false);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const courseFilterRef = useRef();

  useOutsideClick(courseFilterRef, () => {
    if (openFilter) setOpenFilter(false);
  });
    const {isLoading:isCoursesLoading, data:courses} = useGetCourses(search,sort,page,limit)


    const handleSortSelection = (selectedSort) => {
      setSort(selectedSort);
      // Close the filter dropdown
      setOpenFilter(false);
    };
  
  
    const handleClearFilters = () => {
      setSearch("");
      setSort("");
      setPage(1);
      setOpenFilter(false);
    };


  return (
    <>
        <div class="absolute mx-8 sm:mx-8 md:mx-8 lg:hidden">
        <i  onClick={() => setOpenFilter(true)} className="fa-solid fa-list lg:hidden"></i>
        </div>
    <div class="search-content flex sm:mx-8 md:mx-8">

          <div
            ref={courseFilterRef}
            className={`${
              openFilter ? "" : "hidden"
            } filter-sideBar w-2/3 max-w-xs md:w-1/3 lg:hidden flex flex-col gap-3 rounded-lg bg-white shadow px-3 py-5 absolute z-40`}
          >
            <div className="close absolute z-20 right-2 top-2">
                <Close onClick={() => setOpenFilter(false)}/>
            </div>

            <div className="filters">
            <h1 className="text-2xl text-center py-3">Filters</h1>
          </div>
          <div className="sort pl-4 py-3">
            <h1 className="text-xl py-3">Sort</h1>
            <div className="flex flex-col gap-2 py-2 pl-4">
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  value={sort}
                  checked={sort === "title"}
                  onChange={() => handleSortSelection("title")}
                   />
                <label for="text">Alphabetically, A-Z</label>
              </div>
             
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  value={sort}
                  checked={sort === "-title"}
                  onChange={() => handleSortSelection("-title")}
                   />
                <label for="text">Alphabetically, Z-A</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  value={sort}
                  checked={sort === "tuition"}
                  onChange={() => handleSortSelection("tuition")}
                   />
                <label for="text">Price Low To High</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  value={sort}
                  checked={sort === "-tuition"}
                  onChange={() => handleSortSelection("-tuition")}
                   />
                <label for="text">Price High To Low</label>
              </div>
            </div>
          </div>
            <button
            onClick={handleClearFilters}
              className="mt-1 px-4 py-2 font-base tracking-wide hover:scale-105 transition-all bg-white btn-shadow hover:shadow-custom hover:bg-stone-50 border border-gray-100 rounded-lg"
            >
              Clear
            </button>
          </div>


        <div class="left hidden sm:hidden md:hidden lg:flex lg:flex-col xl:flex xl:flex-col filters side-bar w-[300px]">
            <div class="filters">
                <h1 class="text-4xl text-center py-3">Filters</h1>
            </div>
           
            <div className="sort pl-4 py-3">
            <h1 className="text-xl py-3">Sort</h1>
            <div className="flex flex-col gap-2 py-2 pl-4">
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  value={sort}
                  checked={sort === "title"}
                  onChange={() => handleSortSelection("title")}
                   />
                <label for="text">Alphabetically, A-Z</label>
              </div>
             
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  value={sort}
                  checked={sort === "-title"}
                  onChange={() => handleSortSelection("-title")}
                   />
                <label for="text">Alphabetically, Z-A</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  value={sort}
                  checked={sort === "tuition"}
                  onChange={() => handleSortSelection("tuition")}
                   />
                <label for="text">Price Low To High</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  value={sort}
                  checked={sort === "-tuition"}
                  onChange={() => handleSortSelection("-tuition")}
                   />
                <label for="text">Price High To Low</label>
              </div>
            </div>
          </div>
            <button
            onClick={handleClearFilters}
              className="mt-1 px-4 py-2 font-base tracking-wide hover:scale-105 transition-all bg-white btn-shadow hover:shadow-custom hover:bg-stone-50 border border-gray-100 rounded-lg"
            >
              Clear
            </button>
        </div>
        <div class="right box-border pt-4 w-full">
        <div className="search-bar w-full px-20 flex">
          <input
            onChange={(e)=>setSearch(e.target.value)}
            className="px-6 py-3 w-full text-lg bg-slate-100 rounded-full "
            type="text"
            placeholder="Search for Courses"
          />
        </div>
        <div class="courses mt-14 ">
        <div className="flex justify-center lg:justify-between xl:justify-between head mb-14">
                <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold">
                  {" "}
                  Courses
                </h1>
               
              </div>
        <div class="flex flex-col lg:justify-center lg:flex-wrap lg:flex-row xl:justify-center xl:flex-wrap xl:flex-row gap-10 lg:gap-8 items-center">
     {isCoursesLoading ? <Loader/> : (
        <>
         {courses?.data.data.map((course)=>(
      <Course key={course._id} course={course} />
    ))}
        </>
     )}
    </div>
    <div>
                    {courses?.data.pagination.prev && (
                      <button
                        onClick={() =>
                          setPage(courses.data.pagination.prev?.page)
                        }
                      >
                        previous
                      </button>
                    )}
                    <div>{page}</div>
                    {courses?.data.pagination.next && (
                      <button
                        onClick={() =>
                          setPage(courses.data.pagination.next?.page)
                        }
                      >
                        next
                      </button>
                    )}
                  </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default SearchCourses