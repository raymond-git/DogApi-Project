import React from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const showNavbar = () => {
    const login = document.querySelector('.login');
    const signup = document.querySelector('.signup');
    login.classList.toggle("show");
    signup.classList.toggle("show");
  };

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div className="container" id="container">
        <div className="wrap">
          <img className="doglogo push" src="/doglogo.png" alt="logo"></img>
          <button onClick={handleLogin} className="login">Login</button>
          <button onClick={handleSignup} className="signup ">Sign Up</button>
          <button className="hamburger_menu" onClick={showNavbar}><FaBars /></button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
