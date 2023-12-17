import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import { baseURL } from '../../services/userService'


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const respons = await axios.get(`${baseURL}/users`)
    console.log(respons)
    return respons.data.payload.users
})

export type Users = {
    id: string
    userName: string
    email: string
    password: string
    image: string
    isAdmin: boolean
    isBanned: boolean
}

export type UsersState = {
    users: Users[]
    error: null | string
    isLoading: boolean
    isLoggedIn: boolean
    userData: Users | null,
    searchTerm: string,
    ban: boolean
}

const data =
    localStorage.getItem('loginData') !== null ? JSON.parse(String(localStorage.getItem('loginData'))) : []

const initialState: UsersState = {
    users: [],
    error: null,
    isLoading: false,
    isLoggedIn: data.isLoggedIn,
    userData: data.userData,
    searchTerm: '',
    ban: false
}

export const usersSlice = createSlice({
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
        },
        searchUser: (state, action) => {
            state.searchTerm = action.payload
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        updateUser: (state, action) => {
            const { id, firstName, lastName } = action.payload
            const foundUser = state.users.find((user) => user.id === id)
            if (foundUser) {
                foundUser.userName = firstName
                state.userData = foundUser
                localStorage.setItem('loginData', JSON.stringify({
                    isLoggedIn: state.isLoggedIn,
                    userData: state.userData
                })
                )
            }
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
    }
})

export const { login, logout, searchUser, addUser, updateUser } = usersSlice.actions
export default usersSlice.reducer
