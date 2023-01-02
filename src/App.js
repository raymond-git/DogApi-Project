import "./App.css";
import "./index.css";
import Homepage from "./Home";
import LoginForm from "./LoginForm";
import DogBreed from "./DogBreed";
import SignupForm from "./SignupForm.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/signup" element={<SignupForm />} />
          <Route exact path="/dogbreed" element={<DogBreed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
