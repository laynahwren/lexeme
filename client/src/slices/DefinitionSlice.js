import { createSlice } from '@reduxjs/toolkit'

export const definitionSlice = createSlice({
    name: 'definition',
    initialState: {
        definitionOpen: false,
        definition: {},
        inWord: false
    },
    reducers: {
        setDefinitionOpen: (state, action) => {
            state.definitionOpen = action.payload
        },
        setDefinition: (state, action) => {
            state.definition = action.payload
        },
        setInWord: (state, action) => {
            state.inWord = action.payload
        }
    }
})

export const { setDefinitionOpen, setDefinition, setInWord } = definitionSlice.actions
export default definitionSlice.reducer