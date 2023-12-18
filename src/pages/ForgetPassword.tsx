import { ThemeProvider } from '@emotion/react'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import themes from '../Theme/Themes'
import { Button } from '@mui/material'
import { forgetPassword } from '../redux/users/usersSlice'
import { AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux'

const ForgetPassword = () => {

    const [email, setEmail] = useState('')
    const dispatch: AppDispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        dispatch(forgetPassword(email))
        console.log('email has been sent')
    }

    return (
        <ThemeProvider theme={themes} >
            <div className='Register-container'>
                <div className="Register-card">
                    <h2>Forget Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='form-field'>
                            <label htmlFor='email'>Email: </label>
                            <input type='text' name='email' value={email} onChange={handleChange} required />
                        </div>
                        <Button
                            className="show-btn"
                            variant="outlined"
                            type='submit'
                            color="secondary"
                            size="small">
                            send reset password email</Button>
                    </form>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default ForgetPassword