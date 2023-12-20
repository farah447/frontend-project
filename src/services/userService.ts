import axios from 'axios'
import { Users } from '../redux/users/usersSlice'

export const baseURL = 'http://localhost:3003'



export const createUser = async (newUser: FormData) => {
    const respons = await axios.post(`${baseURL}/users/process-register`, newUser)
    console.log(respons.data)
    return respons.data
}

export const activateUserAccount = async (token: string | undefined) => {
    const respons = await axios.post(`${baseURL}/users/activate`, { token })
    return respons.data
}

export const deleteUsers = async (userName: string) => {
    await axios.delete<Users[]>(`${baseURL}/users/${userName}`)
    return userName
}

export const banUnbanUsers = async (userName: string) => {
    await axios.put(`${baseURL}/users/updateBan/${userName}`)
    return userName
}

export const updateUser = async (userData: Users) => {
    await axios.put(`${baseURL}/users/${userData.userName}`, userData)
    return userData;
}

export const loginUser = async (user: object) => {
    const respons = await axios.post(`${baseURL}/auth/login`, user)
    return respons.data
}

export const logoutUser = async () => {
    const respons = await axios.post(`${baseURL}/auth/logout`)
    return respons.data
}


export const forgetPassword = async (email: string) => {
    const respons = await axios.put(`${baseURL}/users/forget-Password`, { email })
    return respons.data
}

export const resetPassword = async (data: { password: string, token: string }) => {
    const respons = await axios.put(`${baseURL}/users/reset-Password`, { password: data.password, token: data.token })
    return respons.data
}