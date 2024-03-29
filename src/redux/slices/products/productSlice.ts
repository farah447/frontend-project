import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import { API_BASE_URL } from '../../users/usersSlice'
import api from '../../../api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (data: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/products?page=${data.page}?&limit=${data.limit}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (slug: string | undefined, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/products/${slug}`);
      console.log(response.data.payload)
      return response.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (productData: Partial<Product>, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_BASE_URL}/products/${productData.slug}`, productData);
      console.log(response.data)
      console.log(productData)
      return productData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProducts = createAsyncThunk('product/deleteProduct', async (slug: string) => {
  const respons = await api.delete(`${API_BASE_URL}/products/${slug}`)
  console.log('products is deleted', slug)
  return slug
})

export const createProducts = createAsyncThunk('product/createProduct', async (formData: FormData) => {
  console.log(formData)
  try {
    const respons = await api.post(`${API_BASE_URL}/products`, formData
      , {
        headers: {
          'content-Type': 'multipart/form-data'
        }
      }
    )
    console.log("create product")
    console.log(respons.data.payload)
    return respons.data.payload
  } catch (error) {
    console.log(error);
  }
})


export type Product = {
  _id: string
  title: string
  slug: string
  price: number
  image: string
  description: string
  quantity: number
  category: string[];
  sold: number
  shipping: number
}

export type ProductState = {
  products: Product[]
  error: null | string
  pagination: {
    currentPage: number,
    totalPages: number,
    totalProducts: number
  },
  isLoading: boolean
  singleProduct: Product
  searchTerm: string
}

const initialState: ProductState = {
  products: [],
  error: null,
  pagination: {
    currentPage: 0,
    totalPages: 0,
    totalProducts: 0
  },
  isLoading: false,
  singleProduct: {} as Product,
  searchTerm: '',
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchTerm = action.payload
    },
    sortProducts: (state, action) => {
      const sortCriteria = action.payload;
      if (sortCriteria === 'title') {
        state.products.sort((a, b) => a.title.localeCompare(b.title))
      }
      else if (sortCriteria === 'Low to hight price') {
        state.products.sort((a, b) => Number(a.price) - Number(b.price))

      } else if (sortCriteria === 'hight to Low price') {
        state.products.sort((a, b) => b.price - a.price)
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.payload.products
      state.isLoading = false
    })

    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      console.log(action.payload)
      state.singleProduct = action.payload
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      console.log(action.payload)
      const { slug, title, price } = action.payload
      const foundCategory = state.products.find((product) => product.slug === slug)
      if (foundCategory) {
        foundCategory.title = title
        foundCategory.price = price
      }
    });

    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      const filterProducts = state.products.filter((product) => product.slug !== action.payload)
      state.products = filterProducts
      // state.products = [...state.products, action.payload]
      state.isLoading = false
    })

    builder.addCase(createProducts.fulfilled, (state, action) => {
      // state.products.push(action.payload.payload);
      state.products = [...state.products, action.payload.payload]
      state.isLoading = false;
    });

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

export const { searchProduct, sortProducts } = productSlice.actions
export default productSlice.reducer
