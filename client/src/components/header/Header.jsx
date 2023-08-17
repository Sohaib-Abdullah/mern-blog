import { useState } from "react";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/apiCall";

const Header = () => {

  return (
   
    
    <div className="header">
         
        <div className="headerTitles">
        <span className="headerTitlesSm">React & Node</span>
          <span className="headerTitlesLg">Blog</span>
        </div>
        <div className="headerImg">

        <img 
         src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
         alt="" />
         </div>
    </div>
  )
}

export default Header