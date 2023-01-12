import React, { useRef } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function NavBarLogged() {
  const nav = useRef();
  const showNavbar = () => {
    console.log("Show navbar called");
    nav.current.classList.toggle("responsive_nav");
  };
  
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/")
  }

  const handleLogo = () => {
    navigate("/welcome");
  }
  return (
    <div>
      <div className="container" id="container">
        <div className="wrap">
          <img onClick={handleLogo} className="doglogo push" src="/doglogo.png" alt="logo"></img>
          {/* <button className="login">Welcome</button> */}
          <button onClick={handleLogOut} className="signup">Logout</button>
          <button className="hamburger_menu" onClick={showNavbar}>
            <FaBars />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBarLogged;
