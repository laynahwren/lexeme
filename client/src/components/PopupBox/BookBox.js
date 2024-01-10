import { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { updateLibrary, updateCurrentRead } from '../../utils/userAccount'
import { setPopupOpen, setBooks, setBookSearch } from '../../slices/BookPopupSlice'
import { setUser } from '../../slices/UserSlice'
import './PopupBox.css'

const BookBox = () => {
    const books = useSelector(state => state.bookPopup)
    const user = useSelector(state => state.user)
    const [chosenBook, setChosenBook] = useState({})
    const dispatch = useDispatch()

    const onClose = () => {
        dispatch(setBooks([]))
        dispatch(setBookSearch(''))
        dispatch(setPopupOpen(false))
    }

    const onCheck = (e, item) => {
        if (e.target.checked) {
            setChosenBook(item)
        } else {
            setChosenBook({})
        }
    }

    const setBook = async (current) => {
        let isbn = chosenBook.volumeInfo.industryIdentifiers.find(item => item.type === 'ISBN_10').identifier
        let res = await updateLibrary({ 'isbn': isbn })
        let res2
        if (current) {
            res2 = await updateCurrentRead({ 'isbn': isbn })
        }

        dispatch(setUser({ ...user, books: res.value.books, currentRead: res2.value ? res2.value.currentRead : user.currentRead }))

        onClose()
    }

    const getBooks = (book) => {
        return (
            <div className='book-res-container' key={book.id}>
                <input type='checkbox'
                    disabled={chosenBook.id && chosenBook.id !== book.id}
                    onChange={(e) => onCheck(e, book)} />
                {book.volumeInfo.imageLinks ? <img src={book.volumeInfo.imageLinks?.smallThumbnail} alt='Book Thumbnail' /> : null}
                <div className='book-res-info'>
                    <div className='book-res-title'>{book.volumeInfo.title}</div>
                    <div className='book-res-authors'>{book.volumeInfo.authors?.join(', ')}</div>
                    <div className='book-res-published'>{book.volumeInfo.publishedDate?.split('-')[0]}</div>
                    {book.volumeInfo.pageCount ? <div className='book-res-pages'>Pages: {book.volumeInfo.pageCount}</div> : null}
                    <div className='book-res-description'>{book.volumeInfo.description}</div>
                </div>
            </div>
        )
    }

    return (
        <div className='dialogue-container'>
            <div className='popup-box-title'>
                {books.bookSearch}
            </div>
            <button className='close-btn' onClick={onClose}>
                <AiOutlineCloseCircle size={20} />
            </button>
            <div className='items-container'>
                {books.books.map((book) => { return getBooks(book) })}
            </div>
            {chosenBook.id &&
                <div className='add-item-container'>
                    <button id='addAsReadBtn' onClick={() => setBook(true)}>Set as Current Read</button>
                    <button id='addToLibraryBtn' onClick={() => setBook(false)}>Add to Library</button>
                </div>
            }
        </div>
    )
}

export default BookBox