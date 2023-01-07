import React, { useRef} from "react";
import { FaBars } from "react-icons/fa";

function NavBar() {
  const nav = useRef();
  const showNavbar = () => {
    console.log("Show navbar called");
    nav.current.classList.toggle("responsive_nav");
  };

  return (
    <div>
      <div className="container" id="container">
        <div className="wrap">
          <img className="doglogo push" src="/doglogo.png" alt="logo"></img>
          <button className="login">Login</button>
          <button className="signup">Sign Up</button>
          <button className="hamburger_menu" onClick={showNavbar}>
            <FaBars />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
