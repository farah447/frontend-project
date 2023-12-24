import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
axios.defaults.withCredentials = true

export const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL

export const fetchUsers = createAsyncThunk('UserProfile/fetchUsers', async () => {
    const response = await axios.get(`${API_BASE_URL}/users`)
    console.log('Fetched data:', response.data);
    return response.data.payload.users
})

export const createUser = createAsyncThunk(
    'users/createUser',
    async (newUser: FormData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/process-register`, newUser)
            console.log(response.data)
            return response.data
        } catch (error) {
            console.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
export const activateUserAccount = createAsyncThunk('users/activate', async (token: string) => {
    const response = await axios.post(`${API_BASE_URL}/users/activate`, { token })
    return response.data
})

export const deleteUsers = createAsyncThunk('users/deleteUser', async (userName: string) => {
    await axios.delete<Users[]>(`${API_BASE_URL}/users/${userName}`)
    return userName
})

export const banUnbanUsers = createAsyncThunk('users/banUnban', async (userName: string) => {
    await axios.put(`${API_BASE_URL}/users/updateBan/${userName}`)
    return userName
})

export const updateUser = createAsyncThunk('users/updateUsers', async (userData: Partial<Users>) => {
    const response = await axios.put(`${API_BASE_URL}/users/${userData.userName}`, userData)
    //console.log(response)
    return userData;
})

// export const loginUser = createAsyncThunk('users/login', async (user: object) => {
//     const response = await axios.post(`${API_BASE_URL}/auth/login`, user)
//     return response.data
// })
export const loginUser = createAsyncThunk(
    'users/login',
    async (user: object, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, user);
            return response.data.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk('users/logout', async () => {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`)
    return response.data
})


export const forgetPassword = createAsyncThunk('users/forgetPassword', async (email: string) => {
    console.log(email);
    const response = await axios.put(`${API_BASE_URL}/users/forget-password`, { email })
    return response.data.payload
})

export const resetPassword = createAsyncThunk('users/resetPassword', async (data: { password: string, token: string }) => {
    const response = await axios.put(`${API_BASE_URL}/users/reset-Password`, { password: data.password, token: data.token })
    return response.data
})


export type Users = {
    _id: string
    firstName: string | undefined
    lastName: string | undefined
    userName: string
    email: string
    password: string
    image?: string
    isAdmin: boolean
    isBanned: boolean
}

export type UsersState = {
    users: Users[]
    error: null | string
    isLoading: boolean
    isLoggedIn: boolean
    userData: Users | null
    searchTerm: string
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
        /*login: (state, action) => {
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
        },*/
        searchUser: (state, action) => {
            state.searchTerm = action.payload
        },
        /*addUser: (state, action) => {
            state.users.push(action.payload);
        },
        deleteSingleUser: (state, action) => {
            state.users.push(action.payload);
        },*/
        /*updateUser: (state, action) => {
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
        }*/
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload
            console.log(action.payload)
            state.isLoading = false
        })

        builder.addCase(deleteUsers.fulfilled, (state, action) => {
            state.users = state.users.filter((user) => user.userName === action.payload)
            state.isLoading = false
        })

        builder.addCase(banUnbanUsers.fulfilled, (state, action) => {
            const foundUser = state.users.find((user) => user.userName === action.payload)
            if (foundUser) {
                foundUser.isBanned = true
            }
        })

        builder.addCase(updateUser.fulfilled, (state, action) => {
            const { userName,
                firstName,
                //lastName 
            } = action.payload
            const foundUser = state.users.find((user) => user.userName === userName)
            if (foundUser) {
                //console.log(foundUser)
                foundUser.firstName = firstName
                //foundUser.lastName = lastName
                state.userData = foundUser
                localStorage.setItem('loginData', JSON.stringify({
                    isLoggedIn: state.isLoggedIn,
                    userData: state.userData
                })
                )
            }
        })
        /*builder.addCase(updateUser.fulfilled, (state, action) => {
            const { _id, firstName, lastName } = action.payload;

            const foundIndex = state.users.findIndex((user) => user._id === _id);
            if (foundIndex !== -1) {
                const updatedUser = { ...state.users[foundIndex], firstName, lastName };
                state.users[foundIndex] = updatedUser;

                // Update userData if it matches the updated user
                if (state.userData?._id === _id) {
                    state.userData = { ...updatedUser };
                    localStorage.setItem('loginData', JSON.stringify({
                        isLoggedIn: state.isLoggedIn,
                        userData: state.userData
                    }));
                }
            }
        });*/


        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoggedIn = true
            state.userData = action.payload
            console.log(action.payload.message)
            localStorage.setItem('loginData', JSON.stringify({
                isLoggedIn: state.isLoggedIn,
                userData: state.userData
            }))
        })

        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isLoggedIn = false
            state.userData = null
            localStorage.setItem('loginData', JSON.stringify({
                isLoggedIn: state.isLoggedIn,
                userData: state.userData
            }))
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

export const { searchUser } = usersSlice.actions
export default usersSlice.reducer
