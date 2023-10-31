import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch } from 'react-redux'
import { addUser, fetchUsers } from '../redux/users/UsersSlice'
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
        dispatch(fetchUsers()).then(() => {
            dispatch(addUser(newUser));
            console.log("User added:", newUser);
            console.log("Registered user:", newUser);
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
                            <input type='text' name='firstName' value={user.firstName} onChange={handleChange} />
                        </div>
                        <div className='form-field'>
                            <label htmlFor='lastName'>last name: </label>
                            <input type='text' name='lastName' value={user.lastName} onChange={handleChange} />
                        </div>
                        <div className='form-field'>
                            <label htmlFor='email'>Email: </label>
                            <input type='text' name='email' value={user.email} onChange={handleChange} />
                        </div>
                        <div className='form-field'>
                            <label htmlFor='password'>Password: </label>
                            <input type='text' name='password' value={user.password} onChange={handleChange} />
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
