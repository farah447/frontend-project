import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api/index'
import axios from 'axios'
import { API_BASE_URL } from '../../users/usersSlice'
import { Category } from '../../categories/categorySlice'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products?page=${page}&limit=${limit}`);
      //console.log(response.data); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${slug}`);
      console.log(response.data.payload)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ slug, productData }: { slug: string; productData: Partial<Product> }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${slug}`, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProducts = createAsyncThunk('products/deleteProduct', async (slug: string) => {
  const respons = await axios.delete(`${API_BASE_URL}/products/${slug}`)
  return slug
})

export const createProducts = createAsyncThunk('products/createProduct', async (formData: FormData) => {
  const respons = await axios.post(`${API_BASE_URL}/products/`, formData)
  return respons.data
})

export type Product = {
  _id: string
  title: string
  slug: string
  price: number
  image: string
  description: string
  quantity: number
  category: Category[]
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
    // findProductById: (state, action) => {
    //   const _id = action.payload
    //   const foundProduct = state.products.find((product) => product._id === _id);
    //   if (foundProduct) {
    //     state.singleProduct = foundProduct
    //   }
    // },
    // sortProducts: (state, action) => {
    //   const sortCriteria = action.payload;
    //   if (sortCriteria === 'title') {
    //     state.products.sort((a, b) => a.title.localeCompare(b.title))
    //   }
    //   else if (sortCriteria === 'Low to hight price') {
    //     state.products.sort((a, b) => a.price - b.price)

    //   } else if (sortCriteria === 'hight to Low price') {
    //     state.products.sort((a, b) => b.price - a.price)
    //   }
    // },
    // deleteProduct: (state, action) => {
    //   const filterProducts = state.products.filter((product) => product._id !== action.payload)
    //   state.products = filterProducts
    // },
    // addProduct: (state, action) => {
    //   state.products.push(action.payload);
    // },
    // updateProduct: (state, action) => {
    //   const { _id, title } = action.payload
    //   const foundProduct = state.products.find((product) => product._id === _id)
    //   if (foundProduct) {
    //     foundProduct.title = title
    //   }
    // }
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
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      // console.log(action.payload.pagination)
      // const { totalPages, currentPage, totalProducts } = action.payload.pagination;
      // state.pagination = {
      //   currentPage: currentPage,
      //   totalPages: totalPages,
      //   totalProducts: totalProducts
      // },
      state.products = action.payload.payload.products
      state.isLoading = false
    })

    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.singleProduct = action.payload;
      console.log(action.payload.payload)
      state.isLoading = false;
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex((product) => product.slug === action.payload.slug);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.isLoading = false;
    });

    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      const filterProducts = state.products.filter((product) => product.slug !== action.payload)
      state.products = filterProducts
      state.isLoading = false
    })

    builder.addCase(createProducts.fulfilled, (state, action) => {
      state.products.push(action.payload.payload)
      state.isLoading = false
    })

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

export const { searchProduct } = productSlice.actions
export default productSlice.reducer
