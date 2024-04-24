import { configureStore } from '@reduxjs/toolkit'
import { carePilotApi } from './apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';


export const store = configureStore({
  reducer: {
    [carePilotApi.reducerPath]: carePilotApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(carePilotApi.middleware)
})

setupListeners(store.dispatch)
