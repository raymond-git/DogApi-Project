import './App.css';
import './index.css';
import LoginForm from './LoginForm';
import DogBreed from './DogBreed';
import SignupForm from './SignupForm.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginForm/>} />
          <Route exact path="/signup" element={<SignupForm/>} />
          <Route exact path="/dogbreed" element={<DogBreed/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
   

export default App;
