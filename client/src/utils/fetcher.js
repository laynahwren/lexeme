import axios from 'axios'

const KEY = process.env.REACT_APP_BOOK_KEY

// Get book data
export const fetchBookByTitle = (params) => {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${params}&key=${KEY}`)
        .then((res) => {
            return res.data
        })
}

export const fetchBookByIsbn = (params) => {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${params}&key=${KEY}`)
        .then((res) => {
            return res.data
        })
}

// Get word
export const fetchWord = (word) => {
    return axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => { return err })
}