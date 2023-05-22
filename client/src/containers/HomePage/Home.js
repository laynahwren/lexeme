import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LexemeIcon from '../../assets/LexemeIcon.png'
import { BsSearch } from 'react-icons/bs'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { fetchWord, fetchBook } from '../../utils/fetcher'
import { setDefinition, setDefinitionOpen } from '../../slices/DefinitionSlice'
import { setPopupOpen, setBookSearch, setBooks } from '../../slices/BookPopupSlice'
import NavBar from '../../components/Nav/NavBar'
import DefinitionBox from '../../components/PopupBox/DefinitionBox'
import BookBox from '../../components/PopupBox/BookBox'
import './Home.css'

const HomePage = () => {
    const user = useSelector(state => state.user)
    const { definitionOpen } = useSelector(state => state.definition)
    const { popupOpen } = useSelector(state => state.bookPopup)
    const [searchWord, setSearchWord] = useState('')
    const [searchBook, setSearchBook] = useState('')
    const [showBookSearch, setShowBookSearch] = useState(false)
    const dispatch = useDispatch()

    const onWordSearch = async () => {
        const def = await fetchWord(searchWord)
        dispatch(setDefinition(def[0]))
        dispatch(setDefinitionOpen(true))
        setSearchWord('')
    }

    const onBookSearch = async () => {
        dispatch(setBookSearch(searchBook))
        const book = searchBook.toLowerCase().split(' ').join('+')
        const bookRes = await fetchBook(book)
        dispatch(setBooks(bookRes.items))
        dispatch(setPopupOpen(true))
        setSearchBook('')
    }

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
                <div className='home-search-container'>
                    <div className='search-title'>Add to Your Lexicon</div>
                    <div className='home-search'>
                        <input type='text' placeholder='Search for a word' value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
                        <button className='home-search-btn' onClick={onWordSearch}><BsSearch size={20} /></button>
                    </div>
                    <div className='book-term'>Book term? <button>Enter definition manually</button></div>
                </div>
                <div className='current-book-container'>
                    <div className='current-book-header'>
                        {user.books.length === 0 ? 'What are you reading right now?' : 'Your Current Read'}
                    </div>
                    {!showBookSearch ? <button id='addCurrBookBtn' onClick={() => setShowBookSearch(true)}><IoIosAddCircleOutline size={50} /></button> :
                        <div className='home-search-container'>
                            <div className='home-search'>
                                <input type='text' placeholder='Enter book title' value={searchBook} onChange={(e) => setSearchBook(e.target.value)} />
                                <button className='home-search-btn'><BsSearch size={20} onClick={onBookSearch} /></button>
                            </div>
                        </div>
                    }
                    <div className='add-book-subtitle'>Add a book to start building your library</div>
                </div>
            </div>
            {definitionOpen && <DefinitionBox />}
            {popupOpen && <BookBox />}
        </>
        : <Navigate to='/' />)
}

export default HomePage