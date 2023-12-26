import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios';
import { API_BASE_URL } from '../users/usersSlice';

export const fetchCategory = createAsyncThunk('categories/fetchCategory', async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data;
});

export const createCategory = createAsyncThunk('categories/createCategories', async (title: string) => {
  /*const response = await axios.post(`${API_BASE_URL}/categories/`, { title: title })
  console.log(response.data.payload)
  return response.data.payload*/
  try {
    const response = await axios.post(`${API_BASE_URL}/categories/`, { title: title })
    console.log(response.data.payload)
    return response.data.payload
  } catch (error) {
    console.error('Error creating category:', error.response.data.payload);
    throw error; // Rethrow the error to be caught by the rejected handler
  }
})

export const deleteCategory = createAsyncThunk('categories/deleteCategories', async (slug: string) => {
  await axios.delete(`${API_BASE_URL}/categories/${slug}`)
  return slug
})

export const updateCategory = createAsyncThunk('categories/updateCategories', async (category: Partial<Category>) => {
  await axios.put(`${API_BASE_URL}/categories/${category.slug}`, { title: category.title })
  return category
})


export type Category = {
  _id: string
  title: string
  slug: string
}

export type CategoryState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false
}

export const CategorySlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {
    /*deleteCategory: (state, action) => {
      const filterCategories = state.categories.filter((category) => category._id !== action.payload)
      state.categories = filterCategories
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      const { id, name } = action.payload
      const foundCategory = state.categories.find((category) => category._id === id)
      if (foundCategory) {
        foundCategory.title = name
      }
    }*/
  },
  extraReducers: (builder) => {
    /*builder.addCase(fetchCategory.pending, (state) => {
      state.isLoading = true
      state.error = null
    })*/
    /*builder.addCase(fetchCategory.rejected, (state, action) => {
      state.error = action.error.message || 'An error occurred while fetching categories.'
      state.isLoading = false
    })*/
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.categories = action.payload.payload
      state.isLoading = false
    })
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(category => category.slug !== action.payload);
      state.isLoading = false
    })
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
      // console.log(action.payload)
      state.isLoading = false
    })
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const { slug, title } = action.payload
      const foundCategory = state.categories.find((category) => category.slug === slug)
      if (foundCategory && title) {
        foundCategory.title = title
      }
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

export default CategorySlice.reducer
