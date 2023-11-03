import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api/index'

export const fetchProducts = createAsyncThunk('users/fetchProducts', async () => {
  const respons = await api.get('/mock/e-commerce/products.json')
  return respons.data
}
)

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
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
      const id = action.payload
      const foundProduct = state.products.find((product) => product.id === id);
      if (foundProduct) {
        state.singleProduct = foundProduct
      }
    },
    sortProducts: (state, action) => {
      const sortCriteria = action.payload;
      if (sortCriteria === 'name') {
        state.products.sort((a, b) => a.name.localeCompare(b.name))
      }
      else if (sortCriteria === 'Low to hight price') {
        state.products.sort((a, b) => a.price - b.price)

      } else if (sortCriteria === 'hight to Low price') {
        state.products.sort((a, b) => b.price - a.price)
      }
    },
    deleteProduct: (state, action) => {
      const filterProducts = state.products.filter((product) => product.id !== action.payload)
      state.products = filterProducts
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const { id, name } = action.payload
      const foundProduct = state.products.find((product) => product.id === id)
      if (foundProduct) {
        foundProduct.name = name
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message || 'an error occuered'
      state.isLoading = false
    })
  }
})

export const { findProductById, searchProduct, sortProducts, deleteProduct, addProduct, updateProduct } = productSlice.actions
export default productSlice.reducer
