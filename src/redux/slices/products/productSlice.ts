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
  name: 'user',
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
      else if (sortCriteria === 'price') {
        state.products.sort((a, b) => a.price - b.price)

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

export const { findProductById, searchProduct, sortProducts } = productSlice.actions
export default productSlice.reducer
