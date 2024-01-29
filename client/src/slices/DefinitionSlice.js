import { createSlice } from '@reduxjs/toolkit'

export const definitionSlice = createSlice({
    name: 'definition',
    initialState: {
        definitionOpen: false,
        definition: {},
        inLexicon: false
    },
    reducers: {
        setDefinitionOpen: (state, action) => {
            state.definitionOpen = action.payload
        },
        setDefinition: (state, action) => {
            state.definition = action.payload
        },
        setInLexicon: (state, action) => {
            state.inLexicon = action.payload
        }
    }
})

export const { setDefinitionOpen, setDefinition, setInLexicon } = definitionSlice.actions
export default definitionSlice.reducer