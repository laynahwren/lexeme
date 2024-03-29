import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LexemeIcon from '../../assets/LexemeIcon.png'
import { BsSearch } from 'react-icons/bs'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { fetchWord, fetchBookByTitle } from '../../utils/fetcher'
import { setDefinition, setDefinitionOpen, setInWord } from '../../slices/DefinitionSlice'
import { setPopupOpen, setBookSearch, setBooks } from '../../slices/BookPopupSlice'
import { setAlert, setAlertOpen } from '../../slices/AlertBoxSlice'
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

    useEffect(() => {
        dispatch(setInWord(false))
    })

    const onWordSearch = async () => {
        const def = await fetchWord(searchWord)
        if (def.message) {
            dispatch(setAlert({
                subject: searchWord,
                body: ' not found in dictionary.',
                closeText: 'Cancel',
                actions: [
                    {
                        text: 'Enter manually'
                    }
                ]
            }))
            dispatch(setAlertOpen(true))
        } else {
            dispatch(setDefinition(def[0]))
            dispatch(setDefinitionOpen(true))
        }
        setSearchWord('')
    }

    const onBookSearch = async () => {
        dispatch(setBookSearch(searchBook))
        const book = searchBook.toLowerCase().split(' ').join('+')
        const bookRes = await fetchBookByTitle(book)
        dispatch(setBooks(bookRes.items))
        dispatch(setPopupOpen(true))
        setSearchBook('')
    }

    return (user.name ?
        <>
            <NavBar />
            <div className='page-container'>
                <div className='home-container'>
                    <img id='homeIcon' src={LexemeIcon} alt='Lexeme icon' />
                    <div className='page-title'>Welcome, <span>{user.name}</span></div>
                    <div className='user-summary'>
                        Lexicon:<span>{user.words.length}</span>word{user.words.length > 1 || user.words.length === 0 ? 's' : null}
                        <span>|</span>
                        Library:<span>{user.books.length}</span>book{user.books.length > 1 || user.books.length === 0 ? 's' : null}
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
                            {user.currentRead ? 'Your Current Read' : 'What are you reading right now?'}
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
            </div>
        </>
        : <Navigate to='/' />)
}

export default HomePage