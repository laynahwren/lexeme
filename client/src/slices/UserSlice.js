import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: null,
        email: null,
        books: [],
        words: []
    },
    reducers: {
        setUser: (state, action) => {
            const data = action.payload
            state.name = data.name
            state.email = data.email
            state.books = [ ...data.books ]
            state.words = [ ...data.words ]
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer