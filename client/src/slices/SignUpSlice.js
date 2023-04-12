import { createSlice } from '@reduxjs/toolkit'

export const signUpSlice = createSlice({
    name: 'signup',
    initialState: {
        open: false
    },
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload
        }
    }
})

export const { setOpen } = signUpSlice.actions
export default signUpSlice.reducer