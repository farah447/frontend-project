import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios';
import { API_BASE_URL } from '../users/usersSlice';

export const fetchCategory = createAsyncThunk('categories/fetchCategory', async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data;
});

export const createCategory = createAsyncThunk('categories/createCategories', async (title: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/categories/`, { title: title })
    console.log(response)
    return response.data.payload
  } catch (error) {
    console.error('Error creating category:', error.response.data.payload);
    throw error;
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.categories = action.payload.payload
      state.isLoading = false
    })
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(category => category.slug !== action.payload);
      state.isLoading = false
    })
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload.payload);
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
