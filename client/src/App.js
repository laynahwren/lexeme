import { Routes, Route } from 'react-router-dom'
import LandingPage from './containers/LandingPage/LandingPage';
import { HomePage } from './containers/HomePage/Home';
import './App.css';

function App() {
  return (
    <div id='page'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
