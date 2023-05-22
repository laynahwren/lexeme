import { createSlice } from '@reduxjs/toolkit'

export const bookPopupSlice = createSlice({
    name: 'bookPopup',
    initialState: {
        popupOpen: false,
        books: {},
        bookSearch: ''
    },
    reducers: {
        setPopupOpen: (state, action) => {
            state.popupOpen = action.payload
        },
        setBooks: (state, action) => {
            state.books = action.payload
        },
        setBookSearch: (state, action) => {
            state.bookSearch = action.payload
        }
    }
})

export const { setPopupOpen, setBooks, setBookSearch } = bookPopupSlice.actions
export default bookPopupSlice.reducer