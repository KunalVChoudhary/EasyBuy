import { configureStore } from '@reduxjs/toolkit'
import { cartApi } from '../apiSlice/apiCartSlice'
import { wishListApi } from '../apiSlice/apiWishListSlice'
import { reviewApi } from '../apiSlice/apiReviewSlice'
import displayThemeReducer from '../createSlice/displayThemeSlice'
import userInfoReducer from '../createSlice/userInfoSlice'
export const store = configureStore({
    reducer: {
        [cartApi.reducerPath]:cartApi.reducer,
        [wishListApi.reducerPath]:wishListApi.reducer,
        [reviewApi.reducerPath]:reviewApi.reducer,
        displayTheme:displayThemeReducer,
        userInfo:userInfoReducer,
    },
    middleware: (defaultMiddleware)=> defaultMiddleware()
                .concat(cartApi.middleware)
                .concat(wishListApi.middleware)
                .concat(reviewApi.   middleware)
  })