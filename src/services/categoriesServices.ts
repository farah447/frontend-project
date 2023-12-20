import axios from 'axios'
import { Users } from '../redux/users/usersSlice'
import { baseURL } from './userService'




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
