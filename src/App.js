import './App.css';
import './index.css';
import LoginForm from './LoginForm';
import DogBreed from './DogBreed';
import SignupForm from './SignupForm.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useScreenType from 'react-screentype-hook';



function App() {
  const screenType = useScreenType({
    mobile: 400,
    tablet: 800,
    desktop: 1000,
    largeDesktop: 1600,
  });
  return (
    <div className={`App ${screenType}`}>
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
