import Homepage from './components/Homepage';
import App2 from './components/App2';
import { Routes, Route } from "react-router-dom";
import './App.css';
import ReviewPage from './components/Review';
import SignInPage from './components/Signin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/discover" element={<App2 />} />
      <Route path="/review" element={<ReviewPage/>} />
      <Route path="/signin" element={< SignInPage/>} />
    </Routes>
  );
}

export default App;
