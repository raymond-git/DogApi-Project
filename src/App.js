import "./App.css";
import "./index.css";
import Homepage from "./Home";
import LoginForm from "./LoginForm";
import DogBreed from "./DogBreed";
import SignupForm from "./SignupForm.js";
// import SearchBreed from "./SearchBreed.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Testing from "./Testing";
import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        {/* <Route exact path="/testing" element={<Testing/>} /> */}
          <Route exact path="/" element={<Homepage/>} />
          <Route exact path="/login" element={<LoginForm/>}/>
          <Route exact path="/signup" element={<SignupForm/>} />
          <Route exact path="/dogbreed" element={<DogBreed/>} />
          {/* <Route exact path="/searchbreed" element={<SearchBreed/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
