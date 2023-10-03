import React from 'react'

const AboutUs = () => {
  return (
    <>
     <div className="about relative mt-14 bg-slate-100  flex flex-col lg:flex-row xl:flex-row">
        <div className="left flex flex-col justify-center px-10 xl:pl-20 lg:w-1/2 xl:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl pt-10 text-center font-bold">Get to know about us</h1>
            <p className="text-center lg:text-lg xl:text-lg pt-8">You only have to know one thing that, you can learn anything. Anytime, anywhere to discover yourself. Our content will help you at every step. Anytime, anywhere to discover yourself.</p>
            <div className="py-8 space-y-3">
                <div className="flex items-center gap-3 text-">
                    <img className="w-6 h-6" src="images/secure.svg" alt=""/>
                    <p className="pl-1  font-semibold">Safe and Secured services and every step of process.</p>
                </div>
                <div className="flex items-center gap-3 text-">
                    <img className="w-7 h-7" src="images/lock.svg" alt=""/>
                    <p className=" font-semibold">Secured process of maintaining in every step.</p>
                </div>
                <div className="flex items-center gap-3 text-">
                    <img className="w-7 h-7" src="images/survey.svg" alt=""/>
                    <p className=" font-semibold">It is completely risk free to buy a course on discover.</p>
                </div>
                <div className="flex items-center gap-3 text-">
                    <img className="w-7 h-7" src="images/survey.svg" alt=""/>
                    <p className=" font-semibold">Our content will help you in every step.</p>
                </div>
            </div>
         
        </div>
        <div className="secured absolute bottom-96 lg:bottom-10 xl:bottom-14 right-0 left-0 lg:left-10 xl:left-10 mr-auto ml-auto bg-white w-64 px-5 pt-4">
            <div className="h-10 w-10 flex justify-center items-center rounded-full bg-[#e4fffb]">
                <img className="w-5 h-5" src="images/secure2.svg" alt=""/>
            </div>
            <p className="text- font-semibold pt-4">100% Safe & Secured</p>
            <p className="text-sm pt-2 pb-4">Build a course, build a brand, build a business, Here is What teachable</p>
        </div>
        <div className="right-side lg:w-1/2 xl:w-1/3 lg:m-16 xl:m-20 h-[550px] xl:h-[750px] bg-cover sm:bg-center md:bg-center" style={{ backgroundImage: `url("images/about.jpg")`}}>
        </div>
    </div>
    </>
  )
}

export default AboutUs