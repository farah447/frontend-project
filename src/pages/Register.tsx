import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch } from 'react-redux'
import { addUser, fetchUsers } from '../redux/users/usersSlice'
import { ThemeProvider } from '@mui/material/styles';
import { Button } from "@mui/material";

import themes from '../Theme/Themes';

export const Register = () => {

    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user',
        ban: false
    })

    const [firstNameError, setfirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setpasswordError] = useState('')

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUser((prevUser) => {
            return { ...prevUser, [event.target.name]: event.target.value }
        })
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const newUser = { id: new Date().getTime(), ...user };
        if (user.firstName.length < 2) {
            setfirstNameError('first name must be atleast 2 characters')
            return
        }
        else if (user.lastName.length < 2) {
            setLastNameError('last name must be atleast 2 characters')
            return
        }
        else if (user.email.length < 2) {
            setEmailError('last name must be atleast 2 characters')
            return
        }
        else if (user.password.length < 5) {
            setpasswordError('last name must be atleast 5 characters')
            return
        }
        dispatch(fetchUsers()).then(() => {
            dispatch(addUser(newUser));
        });
        navigate('/login');
    };

    return (
        <ThemeProvider theme={themes} >
            <div className='Register-container'>
                <div className="Register-card">

                    <h2>User Registeration</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='form-field'>
                            <label htmlFor='firstName'>first name: </label>
                            <input type='text' name='firstName' value={user.firstName} onChange={handleChange} required />
                            <p>{firstNameError}</p>
                        </div>
                        <div className='form-field'>
                            <label htmlFor='lastName'>last name: </label>
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
