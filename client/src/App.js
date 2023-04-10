import { Routes, Route } from 'react-router-dom'
import LandingPage from './containers/LandingPage/LandingPage';
import './App.css';

function App() {
  return (
    <div id='page'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
