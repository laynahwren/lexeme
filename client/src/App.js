import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkLoggedIn } from './utils/userAccount'
import { setUser } from './slices/UserSlice'
import LandingPage from './containers/LandingPage/LandingPage'
import HomePage from './containers/HomePage/Home'
import Library from './containers/Library/Library'
import Lexicon from './containers/Lexicon/Lexicon'
import './App.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    async function check() {
      checkLoggedIn()
        .then((res) => {
          if (!res) {
            dispatch(setUser({
              name: null,
              email: null,
              books: [],
              words: []
            }))
          }
        })
    }
    check()
  })

  return (
    <div id='page'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/library' element={<Library />} />
        <Route path='/lexicon' element={<Lexicon />} />
      </Routes>
    </div>
  );
}

export default App;
