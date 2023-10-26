import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/index'

export const fetchCategory = createAsyncThunk('users/fetchCategory', async () => {
  try {
    const response = await api.get('/mock/e-commerce/categories.json');
    return response.data;
  } catch (error) {
    throw error;
  }
});


export type Category = {
  id: number
  name: string
}

export type CategoryState = {
  Categories: Category[]
  error: null | string
  isLoading: boolean
}

const initialState: CategoryState = {
  Categories: [],
  error: null,
  isLoading: false
}

export const CategorySlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.Categories = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.error = action.error.message || 'An error occurred while fetching categories.'
      state.isLoading = false
    })
    {/*
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.isLoading = false
      state.products = action.payload
    },
    addProduct: (state, action: { payload: { product: Product } }) => {
      // let's append the new product to the beginning of the array
      state.products = [action.payload.product, ...state.products]
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.products.filter((product) => product.id !== action.payload.productId)
      state.products = filteredItems


      export const { removeProduct, addProduct, productsRequest, productsSuccess } = productSlice.actions
    */}
  }
})


export default CategorySlice.reducer
