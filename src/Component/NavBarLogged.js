import React from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function NavBarLogged() {
  const showNavbar = () => {
    const login = document.querySelector('.login');
    const signup = document.querySelector('.signup');
    login.classList.toggle("show");
    signup.classList.toggle("show");
  };

  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/");
  };

  const handleLogo = () => {
    navigate("/welcome");
  };

  const handleSearch = () => {
    navigate("/searchbreed");
  };

  return (
    <div>
      <div className="container" id="container">
        <div className="wrap">
          <img
            onClick={handleLogo}
            className="doglogo push"
            src="/doglogo.png"
            alt="logo"
          ></img>
          <button onClick={handleSearch} className="login">Search Breed</button>
          <button onClick={handleLogOut} className="signup">Logout</button>
          <button className="hamburger_menu" onClick={showNavbar}><FaBars /></button>
        </div>
      </div>
    </div>
  );
}

export default NavBarLogged;
