
function NavBar() {
    return(
    <div className="px-5 py-8 bg-blue-500 opacity-90 relative overflow-hidden">
       <div
          className='absolute right-[-15%] top-0 h-full lg:w-[60%] md:w-[80%]  bg-no-repeat bg-contain'
          style={{ backgroundImage: "url('/bg-image.png')" }}
        ></div>
        <img src="./GrowMeOrganicLogo.webp" alt="" />
    </div>
    )
}

export default NavBar;