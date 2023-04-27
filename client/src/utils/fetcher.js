import axios from 'axios'

const KEY = process.env.BOOK_KEY

// Get book data
export const fetchBook = (params) => {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${params}&key=${KEY}`)
        .then(function (response) {
            console.log(response.data)
        })
}

// Get word
export const fetchWord = (word) => {
    return axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => {
            return res.data
        })
}