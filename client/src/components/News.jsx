import React from 'react'

const News = () => {
  return (
    <>
    <div className="relative mt-20 pre-footer bg-cover bg-center xl:bg-bottom h-[400px] bg-no-repeat" style={{ backgroundImage: `url("images/footer-bg.jpg")`}}>
        <div className="absolute space-y-5 lg:space-y-8 xl:space-y-10 top-[35%] mr-auto ml-auto w-full text-center">
            <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl pt-10 text-center font-semibold">Do you want to be a student?</h1>
            <div className="">
                <button className="px-8 py-3 text-sm lg:text-lg xl:text-lg text-white font-semibold rounded-lg bg-[#4a4cc7] hover:bg-[#4647ab]">View More</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default News