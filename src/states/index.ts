import { configureStore } from '@reduxjs/toolkit'
import diseaseList from './disease'

export const store = configureStore({
  reducer: {
    diseaseList,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
