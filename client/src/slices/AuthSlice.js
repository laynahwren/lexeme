import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        signupOpen: false,
        loginOpen: false
    },
    reducers: {
        setSignupOpen: (state, action) => {
            state.signupOpen = action.payload
        },
        setLoginOpen: (state, action) => {
            state.loginOpen = action.payload
        }
    }
})

export const { setSignupOpen, setLoginOpen } = authSlice.actions
export default authSlice.reducer