import { createSlice } from '@reduxjs/toolkit'

export const alertBoxSlice = createSlice({
    name: 'alertBox',
    initialState: {
        alertOpen: false,
        subject: null,
        body: null,
        closeText: null,
        actions: []
    },
    reducers: {
        setAlertOpen: (state, action) => {
            state.alertOpen = action.payload
        },
        setAlert: (state, action) => {
            state.subject = action.payload.subject
            state.body = action.payload.body
            state.closeText = action.payload.closeText
            state.actions = action.payload.actions
        }
    }
})

export const { setAlertOpen, setAlert } = alertBoxSlice.actions
export default alertBoxSlice.reducer