import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/index'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const respons = await api.get('/mock/e-commerce/users.json')
    return respons.data
}
)

export type Users = {
    id: number
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
}

export type UsersState = {
    users: Users[]
    error: null | string
    isLoading: boolean
    isLoggedIn: boolean
    userData: Users | null
}

const data =
    localStorage.getItem('loginData') !== null ? JSON.parse(String(localStorage.getItem('loginData'))) : []

const initialState: UsersState = {
    users: [],
    error: null,
    isLoading: false,
    isLoggedIn: data.isLoggedIn,
    userData: data.userData
}

export const UsersSlice = createSlice({
    name: 'Users',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true
            state.userData = action.payload
            localStorage.setItem('loginData', JSON.stringify({
                isLoggedIn: state.isLoggedIn,
                userData: state.userData
            }))
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.userData = null
            localStorage.setItem('loginData', JSON.stringify({
                isLoggedIn: state.isLoggedIn,
                userData: state.userData
            }))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
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

export const { login, logout } = UsersSlice.actions
export default UsersSlice.reducer
