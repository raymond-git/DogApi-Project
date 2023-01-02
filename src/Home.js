import React, { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Home() {
  const nav = useRef();
  const showNavbar = () => {
    console.log("Show navbar called");
    nav.current.classList.toggle("responsive_nav");
  };

  return (
    <div>
      <div className="container" id="container">
        <img className="doglogo push" src="/doglogo.png" alt="logo"></img>
        <button className="login">Login</button>
        <button className="signup">Sign Up</button>
        <button className="hamburger_menu" onClick={showNavbar}><FaBars /></button>
      </div>

      <div className="container" id="container">
        <div className="padding">
          <div className="mainTitle">We care about dogs as much as you do.</div>
          <div className="secondaryTitle">
            Join now to browse through a selection of popular dogs breeds and
            choose your favorite
          </div>
          <div className="buttonPadding">
            <button className="browseButton">Browse Dogs</button>
            <button className="learnMore">Learn More</button>
          </div>
        </div>
        <div className="imagePadding">
          <img className="main-Image" src="/holdingDog.png"></img>
        </div>
      </div>
    </div>
  );
}

export default Home;
