import { createSlice } from '@reduxjs/toolkit'

export const definitionSlice = createSlice({
    name: 'definition',
    initialState: {
        definitionOpen: false,
        definition: {}
    },
    reducers: {
        setDefinitionOpen: (state, action) => {
            state.definitionOpen = action.payload
        },
        setDefinition: (state, action) => {
            state.definition = action.payload
        }
    }
})

export const { setDefinitionOpen, setDefinition } = definitionSlice.actions
export default definitionSlice.reducer