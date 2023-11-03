import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../api/index'


export const fetchOrders = createAsyncThunk('users/fetchOrders', async () => {
  const response = await api.get('/mock/e-commerce/orders.json');
  return response.data;
});


export type Orders = {
  id: number;
  productId: number;
  userId: number;
  purchasedAt: string;
}

export type OrdersState = {
  orders: Orders[]
  error: null | string
  isLoading: boolean
}

const initialState: OrdersState = {
  orders: [],
  error: null,
  isLoading: false
}

export const ordersSlice = createSlice({
  name: 'Orders',
  initialState,
  reducers: {
    deleteOrders: (state, action) => {
      const filterOrders = state.orders.filter((order) => order.id !== action.payload)
      state.orders = filterOrders
    },
    addOrders: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrders: (state, action) => {
      const { id, purchasedAt } = action.payload
      const foundOrders = state.orders.find((order) => order.id === id)
      if (foundOrders) {
        foundOrders.purchasedAt = purchasedAt

      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.error = action.error.message || 'An error occurred while fetching Orders.'
      state.isLoading = false
    })
  }
})

export const { deleteOrders, addOrders, updateOrders } = ordersSlice.actions
export default ordersSlice.reducer
