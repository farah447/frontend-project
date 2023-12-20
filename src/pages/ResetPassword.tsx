import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button } from '@mui/material'
import { AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetPassword } from '../redux/users/usersSlice'

const ResetPassword = () => {
    const dispatch: AppDispatch = useDispatch();

    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        dispatch(resetPassword({ password, token }))
        console.log('Password was reset')
        navigate('/login')
    }

    return (
        <div className='container'>
            <div>
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-field'>
                        <label htmlFor='password'>Password: </label>
                        <input type='password' name='password' id='password' value={password} onChange={handleChange} required />
                    </div>
                    <Button
                        className="show-btn"
                        variant="outlined"
                        type='submit'
                        color="secondary"
                        size="small">
                        Reset password</Button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword