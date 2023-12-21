import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api/index'
import axios from 'axios'
import { API_BASE_URL } from '../../users/usersSlice'
import { Category } from '../../categories/categorySlice'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const respons = await axios.get(`${API_BASE_URL}/products`)
  return respons.data
}
)

export type Product = {
  _id: string
  title: string
  slug: string
  price: number
  image: String
  description: string
  quantity: number
  category: Category
  sold: number
  shipping: number
}

export type ProductState = {
  products: Product[]
  error: null | string
  isLoading: boolean
  singleProduct: Product
  searchTerm: string
}

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  singleProduct: {} as Product,
  searchTerm: ''
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchTerm = action.payload
    },
    findProductById: (state, action) => {
      const _id = action.payload
      const foundProduct = state.products.find((product) => product._id === _id);
      if (foundProduct) {
        state.singleProduct = foundProduct
      }
    },
    sortProducts: (state, action) => {
      const sortCriteria = action.payload;
      if (sortCriteria === 'title') {
        state.products.sort((a, b) => a.title.localeCompare(b.title))
      }
      else if (sortCriteria === 'Low to hight price') {
        state.products.sort((a, b) => a.price - b.price)

      } else if (sortCriteria === 'hight to Low price') {
        state.products.sort((a, b) => b.price - a.price)
      }
    },
    deleteProduct: (state, action) => {
      const filterProducts = state.products.filter((product) => product._id !== action.payload)
      state.products = filterProducts
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const { _id, title } = action.payload
      const foundProduct = state.products.find((product) => product._id === _id)
      if (foundProduct) {
        foundProduct.title = title
      }
    }
  },
  extraReducers: (builder) => {
    /*builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message || 'an error occuered'
      state.isLoading = false
    })*/
    // builder.addCase(fetchProducts.fulfilled, (state, action) => {
    //   state.products = action.payload
    //   state.isLoading = false
    // })
    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true
        state.error = null
      }
    )

    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.error = action.error.message || 'an error occuered'
        state.isLoading = false
      }
    )
  }
})

export const { findProductById, searchProduct, sortProducts, deleteProduct, addProduct, updateProduct } = productSlice.actions
export default productSlice.reducer
