import { configureStore } from '@reduxjs/toolkit'
import signupReducer from './slices/SignUpSlice'

export default configureStore({
  reducer: {
    signUp: signupReducer
  }
})