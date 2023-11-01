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
      const { id, name } = action.payload
      const foundOrders = state.orders.find((order) => order.id === id)
      if (foundOrders) {
        // foundOrders.name = name
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

export const { deleteOrders, addOrders, updateOrders } = ordersSlice.actions
export default ordersSlice.reducer
