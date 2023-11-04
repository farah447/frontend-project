import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './slices/products/productSlice'
import CategoryReducer from './categories/categorySlice'
import UsersReducer from './users/usersSlice'
import ordersReducer from './orders/ordersSlice'
import cartReducer from './cart/cartSlice'

export const store = configureStore({
  reducer: {
    productReducer: productsReducer,
    categoriesReducer: CategoryReducer,
    usersReducer: UsersReducer,
    orderReducer: ordersReducer,
    cartReducer: cartReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
