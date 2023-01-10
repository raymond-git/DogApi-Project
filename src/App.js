import "./App.css";
import "./index.css";
import Homepage from "./Webpages/Home";
import LoginForm from "./Webpages/LoginForm";
import DogBreed from "./Webpages/DogBreed";
import SignupForm from "./Webpages/SignupForm.js";
import SearchBreed from "./Webpages/SearchBreed.js";
import SelectedBreed from "./Webpages/SelectedBreed.js";
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
          <Route exact path="/searchbreed" element={<SearchBreed/>} />
          <Route exact path="/:name" element={<SelectedBreed/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
