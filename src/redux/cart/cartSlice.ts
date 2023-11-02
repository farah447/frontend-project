import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../slices/products/productSlice";

const data = localStorage.getItem('cart') !== null ? JSON.parse(String(localStorage.getItem('cart'))) : []

export type cartState = {
    cartItems: Product[]
    error: null | string
    isLoading: boolean
}

const initialState: cartState = {
    cartItems: data,
    error: null,
    isLoading: false
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload)
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload)
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        removeAllFromCart: (state) => {
            state.cartItems = []
            localStorage.removeItem('cart')
        },
    }
}
)
{/*
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.categories = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchCategory.rejected, (state, action) => {
            state.error = action.error.message || 'An error occurred while fetching categories.'
            state.isLoading = false
        })
       
           deleteCategory: (state, action) => {
            const filterCategories = state.categories.filter((category) => category.id !== action.payload)
            state.categories = filterCategories
        },
        updateCategory: (state, action) => {
            const { id, name } = action.payload
            const foundCategory = state.categories.find((category) => category.id === id)
            if (foundCategory) {
                foundCategory.name = name
            }
        }
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


export const { addToCart, removeFromCart, removeAllFromCart } = cartSlice.actions
export default cartSlice.reducer
