import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LexemeIcon from '../../assets/LexemeIcon.png'
import { BsSearch } from 'react-icons/bs'
import { IoIosAddCircleOutline } from 'react-icons/io'
import NavBar from '../../components/Nav/NavBar'
import './Home.css'

const HomePage = () => {
    const user = useSelector(state => state.user)

    return (user.name ?
        <>
            <NavBar />
            <div className='home-container'>
                <img id='homeIcon' src={LexemeIcon} alt='Lexeme icon' />
                <div className='welcome'>Welcome, <span>{user.name}</span></div>
                <div className='user-summary'>
                    Lexicon:<span>{user.words.length}</span>words
                    <span>|</span>
                    Library:<span>{user.books.length}</span>books
                </div>
                <div className='word-search-container'>
                    <div className='search-title'>Add to Your Lexicon</div>
                    <div className='word-search'>
                        <input type='text' placeholder='Search for a word' />
                        <button id='wordSearchBtn'><BsSearch size={20} /></button>
                    </div>
                    <div className='book-term'>Book term? <button>Enter definition manually</button></div>
                </div>
                <div className='current-book-container'>
                    <div className='current-book-header'>
                        {user.books.length === 0 ? 'What are you reading right now?' : 'Your Current Read'}
                    </div>
                    <button id='addCurrBookBtn'><IoIosAddCircleOutline size={50} /></button>
                    <div className='add-book-subtitle'>Add a book to start building your library</div>
                </div>
            </div>
        </>
        : <Navigate to='/' />)
}

export default HomePage