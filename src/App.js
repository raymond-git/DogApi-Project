import './App.css';
import SignupForm from './SignupForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<SignupForm/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
   

export default App;
