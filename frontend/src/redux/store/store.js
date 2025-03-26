import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from '../features/cart/cartSlice'
import { cartApi } from '../apiSlice/apiCartSlice'
export const store = configureStore({
    reducer: {
        [cartApi.reducerPath]:[cartApi.reducer]
    },
    middleware: (defaultMiddleware)=>{ defaultMiddleware().concat(cartApi.middleware)}
  })