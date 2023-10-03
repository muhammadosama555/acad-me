import React, { useRef, useState } from "react";
import { useGetAcademies } from "../apiCalls/academyApiCalls";
import Academy from "../components/Academy";
import {
    Close,
  } from "@mui/icons-material";
import useOutsideClick from "../hooks/useOutsideClick";
import Loader from "../components/Loader";

const SearchAcademies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const academyFilterRef = useRef();
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState("5");
  const [careers, setCareers] = useState([]);
  const [sort, setSort] = useState("");
  const [maxRating, setMaxRating] = useState(5)
  

  useOutsideClick(academyFilterRef, () => {
    if (openFilter) setOpenFilter(false);
  });

  const { isLoading, data } = useGetAcademies(currentPage, limit, search, careers,sort,maxRating);
  console.log(data?.data?.pagination)

  const handleCareerSelection = (selectedCareer) => {
    // Check if the selectedCareer is already in the careers array
    if (careers.includes(selectedCareer)) {
      // If it is, remove it
      setCareers(careers.filter((career) => career !== selectedCareer));
    } else {
      // If it's not, add it
      setCareers([...careers, selectedCareer]);
    }
    // Close the filter dropdown
    setOpenFilter(false);
  };

  const handleSortSelection = (selectedSort) => {
    setSort(selectedSort);
    // Close the filter dropdown
    setOpenFilter(false);
  };

  const handleMaxRating = (selectedRating) => {
    setMaxRating(selectedRating)
     // Close the filter dropdown
    setOpenFilter(false)
  }

  const handleClearFilters = () => {
    setSearch("");
    setSort("");
    setCurrentPage(1);
    setCareers([])
    setOpenFilter(false);
  };
  
  

  return (
    <>
      <div className="absolute mx-8 sm:mx-8 md:mx-8 lg:hidden ">
        <i   onClick={() => setOpenFilter(!openFilter)} className="fa-solid fa-list"></i>
      </div>
      <div className="search-content flex sm:mx-8 md:mx-8">

      <div
            ref={academyFilterRef}
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
          <div className="category pl-4 pb-3 border-t border-gray-200">
            <h1 className="text-xl py-3">Category</h1>
            <div className="flex flex-col gap-2 py-2 pl-4">
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={careers.includes("Web Development")} 
                  onChange={() => handleCareerSelection("Web Development")}
                   />
                <label for="text">Web Development</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={careers.includes("Mobile Development")} 
                  onChange={() => handleCareerSelection("Mobile Development")}
                  />
                <label for="text">Mobile Development</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={careers.includes("UI/UX")} 
                  onChange={() => handleCareerSelection("UI/UX")}
                  />
                <label for="text">UI/UX</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={careers.includes("Data Science")} 
                  onChange={() => handleCareerSelection("Data Science")}
                  />
                <label for="text">Data Science</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox" 
                  checked={careers.includes("Business")} 
                  onChange={() => handleCareerSelection("Business")}
                  />
                <label for="text">Business</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={careers.includes("Others")} 
                  onChange={() => handleCareerSelection("Others")}
                  />
                <label for="text">Others</label>
              </div>
            </div>
          </div>
          <div className="rating pl-4 py-3 border-t border-b border-gray-200">
            <h1 className="text-xl pb-3">Rating</h1>
            <div className="rating 5" onClick={()=>handleMaxRating(5)}>
              <i className="text-xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-xl cursor-pointer text-yellow-400 fa-solid fa-star"></i> 
            </div>
            <div className="rating 4"  onClick={()=>handleMaxRating(4)}>
              <i className="text-xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
            </div>
            <div className="rating 3"  onClick={()=>handleMaxRating(3)}>
              <i className="text-xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
            </div>
            <div className="rating 2"  onClick={()=>handleMaxRating(2)}>
              <i className="text-xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
            </div>
            <div className="rating 1"  onClick={()=>handleMaxRating(1)}>
              <i className="text-xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
            </div>
          </div>
          <div className="sort pl-4 py-3">
            <h1 className="text-xl py-3">Sort</h1>
            <div className="flex flex-col gap-2 py-2 pl-4">
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  value={sort}
                  checked={sort === "name"}
                  onChange={() => handleSortSelection("name")}
                   />
                <label for="text">Alphabetically, A-Z</label>
              </div>
             
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  value={sort}
                  checked={sort === "-name"}
                  onChange={() => handleSortSelection("-name")}
                   />
                <label for="text">Alphabetically, Z-A</label>
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

        <div className="left hidden sm:hidden md:hidden lg:flex lg:flex-col xl:flex xl:flex-col filters side-bar w-[300px]">
          <div className="filters">
            <h1 className="text-4xl text-center py-3">Filters</h1>
          </div>
          <div className="category pl-6 pb-4 border-t border-gray-200">
            <h1 className="text-2xl py-3">Category</h1>
            <div className="flex flex-col gap-2 py-2 pl-4">
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={careers.includes("Web Development")} 
                  onChange={() => handleCareerSelection("Web Development")}
                   />
                <label for="text">Web Development</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={careers.includes("Mobile Development")} 
                  onChange={() => handleCareerSelection("Mobile Development")}
                  />
                <label for="text">Mobile Development</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={careers.includes("UI/UX")} 
                  onChange={() => handleCareerSelection("UI/UX")}
                  />
                <label for="text">UI/UX</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={careers.includes("Data Science")} 
                  onChange={() => handleCareerSelection("Data Science")}
                  />
                <label for="text">Data Science</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox" 
                  checked={careers.includes("Business")} 
                  onChange={() => handleCareerSelection("Business")}
                  />
                <label for="text">Business</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={careers.includes("Others")} 
                  onChange={() => handleCareerSelection("Others")}
                  />
                <label for="text">Others</label>
              </div>
            </div>
          </div>
          <div className="rating pl-6 py-4 border-t border-b border-gray-200">
            <h1 className="text-2xl pb-3">Rating</h1>
            <div className="rating 5" onClick={()=>handleMaxRating(5)}>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i> 
            </div>
            <div className="rating 4"  onClick={()=>handleMaxRating(4)}>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
            </div>
            <div className="rating 3"  onClick={()=>handleMaxRating(3)}>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
            </div>
            <div className="rating 2"  onClick={()=>handleMaxRating(2)}>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
            </div>
            <div className="rating 1"  onClick={()=>handleMaxRating(1)}>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
            </div>
          </div>
          <div className="sort pl-6 py-4">
            <h1 className="text-2xl py-3">Sort</h1>
            <div className="flex flex-col gap-2 py-2 pl-4">
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  value={sort}
                  checked={sort === "name"}
                  onChange={() => handleSortSelection("name")}
                   />
                <label for="text">Alphabetically, A-Z</label>
              </div>
             
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  value={sort}
                  checked={sort === "-name"}
                  onChange={() => handleSortSelection("-name")}
                   />
                <label for="text">Alphabetically, Z-A</label>
              </div>
              <button
            onClick={handleClearFilters}
              className="mt-1 px-4 py-2 font-base tracking-wide hover:scale-105 transition-all bg-white btn-shadow hover:shadow-custom hover:bg-stone-50 border border-gray-100 rounded-lg"
            >
              Clear
            </button>
            </div>
          </div>
        </div>

        <div className="right box-border pt-4 w-full">
          <div className="search-bar w-full px-20 flex">
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="px-6 py-3 w-full text-lg bg-slate-100 rounded-full "
              type="text"
              placeholder="Search for Academies"
            />
          </div>
          <div className="flex flex-wrap gap-10 justify-center mt-10">
            <div className="academies mt-14 ">
              <div className="flex justify-center lg:justify-between xl:justify-between head mb-14">
                <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold">
                  {" "}
                  Academies
                </h1>
               
              </div>
              <div className="flex flex-col lg:justify-center lg:flex-wrap lg:flex-row xl:justify-center xl:flex-wrap xl:flex-row gap-10 lg:gap-8 items-center">
                {isLoading ? (
                  <Loader/>
                ) : (
                  <>
                    {data?.data.data.map((academy) => (
                      <Academy key={academy._id} academy={academy} />
                    ))}
                  </>
                )}
              </div>
            </div>
            {isLoading ? (
              <Loader/>
            ) : (
              <>
               
                  <div>
                    {data.data.pagination.prev && (
                      <button
                        onClick={() =>
                          setCurrentPage(data.data.pagination.prev?.page)
                        }
                      >
                        previous
                      </button>
                    )}
                    <div>{currentPage}</div>
                    {data.data.pagination.next && (
                      <button
                        onClick={() =>
                          setCurrentPage(data.data.pagination.next?.page)
                        }
                      >
                        next
                      </button>
                    )}
                  </div>
             
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchAcademies;
