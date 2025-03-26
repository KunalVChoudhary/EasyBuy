import { configureStore } from '@reduxjs/toolkit'
import { cartApi } from '../apiSlice/apiCartSlice'
import { wishListApi } from '../apiSlice/apiWishListSlice'

export const store = configureStore({
    reducer: {
        [cartApi.reducerPath]:[cartApi.reducer],
        [wishListApi.reducerPath]:[wishListApi.reducer]
    },
    middleware: (defaultMiddleware)=>{ defaultMiddleware().concat(cartApi.middleware).concat(wishListApi.middleware)}
  })