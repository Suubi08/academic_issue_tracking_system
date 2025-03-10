import React from "react";
import logo from "../assets/image.png";
import { FaHome,FaExclamationCircle, FaRegFileAlt } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
//import { MdReportProblem } from "react-icons/md";

function Sidebar() {
  return (
    <div className="w-64 bg-blue-950 fixed h-full px-4 py-2">
      <img src={logo} alt="logo" />
      {/* <hr className='mt-3'/> */}
      <ul className="mt-3 text-white">
        <li className="li-dashboard ">
          <a className=" a_dashboard " href="">
            <FaHome className="inline-block w-6 h-6 mr-2  !text-white"></FaHome>
            Issue dashboard
          </a>
        </li>
        <li className="li-dashboard ">
          <a className=" a_dashboard " href="">
            <FaExclamationCircle className="inline-block w-6 h-6 mr-2  !text-white"></FaExclamationCircle>
            My Issues
          </a>
        </li>
        <li className="li-dashboard">
          <a className=" a_dashboard " href="">
            < FaRegFileAlt className="inline-block w-6 h-6 mr-2  !text-white"></ FaRegFileAlt>
            Reports and Analytics
          </a>
        </li> 
        <li className="li-dashboard ">
          <a className=" a_dashboard " href="">
            <FiSettings className="inline-block w-6 h-6 mr-2  !text-white"></FiSettings>
            Settings and Profile
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
