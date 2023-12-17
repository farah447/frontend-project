import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch } from 'react-redux'
import { addUser, fetchUsers } from '../redux/users/usersSlice'
import { ThemeProvider } from '@mui/material/styles';
import { Button } from "@mui/material";

import themes from '../Theme/Themes';
import { createUser } from '../services/userService'

export const Register = () => {

    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        image: '',
        address: ''
    })

    const [firstNameError, setfirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [userNameError, setuserNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setpasswordError] = useState('')

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.target.type === 'file') {
            console.log('file selected')
            const fileInput = (event.target as HTMLInputElement) || ''
            setUser((prevUser) => {
                return { ...prevUser, [event.target.name]: fileInput.files?.[0].name }
            })
        } else {
            setUser((prevUser) => {
                return { ...prevUser, [event.target.name]: event.target.value }
            })
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData()
        formData.append('firstName', user.firstName)
        formData.append('lastName', user.lastName)
        formData.append('userName', user.userName)
        formData.append('email', user.email)
        formData.append('password', user.password)
        formData.append('image', user.image)
        formData.append('address', user.address)

        try {
            for (var key of formData.entries()) {
                console.log(key[0] + ',' + key[1])
            }
            const response = await createUser(formData)
            console.log(response)
        } catch (error) {
            console.log(error.response.data.message)
        }

        //const newUser = { id: new Date().getTime(), ...user };
        if (user.firstName.length < 2) {
            setfirstNameError('first name must be atleast 2 characters')
            return
        }
        else if (user.lastName.length < 2) {
            setLastNameError('last name must be atleast 2 characters')
            return
        }
        else if (user.email.length < 2) {
            setEmailError('email must be atleast 3 characters')
            return
        }
        else if (user.password.length < 5) {
            setpasswordError('password must be atleast 5 characters')
            return
        }
        else if (user.userName.length < 5) {
            setuserNameError('user name must be atleast 3 characters')
            return
        }
        //dispatch(fetchUsers()).then(() => {
        //dispatch(addUser(newUser));
        //});
        navigate('/login');
    };

    return (
        <ThemeProvider theme={themes} >
            <div className='Register-container'>
                <div className="Register-card">

                    <h2>User Registeration</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='form-field'>
                            <label htmlFor='firstName'>First name: </label>
                            <input type='text' name='firstName' value={user.firstName} onChange={handleChange} required />
                            <p>{firstNameError}</p>
                        </div>
                        <div className='form-field'>
                            <label htmlFor='lastName'>Last name: </label>
                            <input type='text' name='lastName' value={user.lastName} onChange={handleChange} required />
                            <p>{lastNameError}</p>
                        </div>
                        <div className='form-field'>
                            <label htmlFor='email'>Email: </label>
                            <input type='text' name='email' value={user.email} onChange={handleChange} required />
                            <p>{emailError}</p>
                        </div>
                        <div className='form-field'>
                            <label htmlFor='password'>Password: </label>
                            <input type='text' name='password' value={user.password} onChange={handleChange} required />
                            <p>{passwordError}</p>
                        </div>
                        <div className='form-field'>
                            <label htmlFor='userName'>User name: </label>
                            <input type='text' name='userName' value={user.userName} onChange={handleChange} required />
                            <p>{userNameError}</p>
                        </div>
                        <div className='form-field'>
                            <label htmlFor='address'>Address: </label>
                            <textarea name='address' value={user.address} onChange={handleChange} required />
                        </div>
                        <div className='form-field'>
                            <label htmlFor='image'>Image: </label>
                            <input type='file' name='image' accept='image/*' onChange={handleChange} required />
                        </div>
                        <Button
                            className="show-btn"
                            variant="outlined"
                            type='submit'
                            color="secondary"
                            size="small">
                            Register</Button>
                    </form>
                </div>
            </div>
        </ThemeProvider>
    )
}
