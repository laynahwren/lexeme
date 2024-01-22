import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import authReducer from './slices/AuthSlice'
import userReducer from './slices/UserSlice'
import definitionReducer from './slices/DefinitionSlice'
import bookPopupReducer from './slices/BookPopupSlice'
import alertBoxReducer from './slices/AlertBoxSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  definition: definitionReducer,
  bookPopup: bookPopupReducer,
  alertBox: alertBoxReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})