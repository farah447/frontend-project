import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './slices/products/productSlice'
import CategoryReduser from './categories/categorySlice'
import UsersReducer from './users/UsersSlice'

export const store = configureStore({
  reducer: {
    productR: productsReducer,
    categoriesR: CategoryReduser,
    UsersR: UsersReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
