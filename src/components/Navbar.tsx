import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

function Navbar() {
  const [currDate, setCurrDate] = useState(new Date().toLocaleDateString());
  const [currTime, setCurrTime] = useState(new Date().toLocaleTimeString());
  //   const [sec, setSec] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrDate(new Date().toLocaleDateString());
      setCurrTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  //   useEffect(()=>{
  //     setInterval(()=>{setSec(sec+1)
  //     }, 1000)}, [sec])

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoutHandler = () => {
    toast.success("Logout successful", { autoClose: 1000 });
    navigate("/");
  };

  return (
    <>
      <div className="w-full bg-green-800 h-20 flex items-center justify-between font-pop shadow-sm fixed z-10 px-4 md:px-8">
        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* left side code (hidden on mobile) */}
        <div className="left hidden md:flex gap-6 items-center font-normal text-sm">
          {/* <p className="border border-teal-500 rounded-md p-2 cursor-pointer text-teal-500 hover:bg-green-500 hover:text-white transition-colors duration-300">
            Session Time - {sec} seconds
          </p> */}
          <p className="border border-teal-500 rounded-md p-2 cursor-pointer text-teal-500 hover:bg-green-500 hover:text-white transition-colors duration-300">
            {currDate} {currTime}
          </p>
        </div>

        {/* center code */}
        <div className="center flex justify-center items-center">
          <NavLink to="/">
            <h1 className=" text-center text-2xl rounded-md p-2 cursor-pointer text-white">
              Book Management System
            </h1>
          </NavLink>
        </div>

        {/* right side code (hidden on mobile) */}
        <div className="right hidden md:flex gap-6 md:gap-12 items-center font-normal text-sm">
          <button
            onClick={logoutHandler}
            disabled={false}
            className="text-lg p-1 text-red-700 bg-white border-2 border-red-600 rounded-xl cursor-pointer hover:bg-red-500 hover:text-white hover:border-red-800 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu (toggle visibility based on state) */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-800 p-4 absolute top-20 left-0 w-full z-20">
          <div className="flex flex-col items-center">
            <NavLink
              to="faq"
              className="py-2 text-white hover:bg-green-500 hover:text-white transition-colors duration-300"
            >
              FAQ
            </NavLink>
            <NavLink
              to="resources"
              className="py-2 text-teal-500 hover:bg-green-500 hover:text-white transition-colors duration-300"
            >
              Resources
            </NavLink>
            <div className="py-4">
              <button
                onClick={logoutHandler}
                disabled={false}
                className="text-lg p-3 text-red-700 bg-white border-2 border-red-600 rounded-xl cursor-pointer hover:bg-red-500 hover:text-white hover:border-red-800 transition-all duration-300"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
