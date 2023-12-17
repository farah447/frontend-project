import axios from 'axios'

export const baseURL = 'http://localhost:3003'

export const deleteUser = async (userName: string) => {
    const respons = await axios.delete(`${baseURL}/users/${userName}`)
    return respons.data
}

export const banUnbanUsers = async (userName: string) => {
    const respons = await axios.put(`${baseURL}/users/updateBan/${userName}`)
    return respons.data
}

export const createUser = async (newUser: FormData) => {
    const respons = await axios.post(`${baseURL}/users/process-register`, newUser)
    return respons.data
}

export const activateUserAccount = async (token: string) => {
    const respons = await axios.post(`${baseURL}/users/activate`, { token })
    return respons.data
}