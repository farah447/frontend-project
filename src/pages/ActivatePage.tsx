import jwtDecode from 'jwt-decode'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { activateUserAccount } from '../services/userService'
import { AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux'

const ActivatePage = () => {
    const { token } = useParams()
    const decoded = jwtDecode(String(token))
    const navigate = useNavigate()

    const handleActivate = async () => {
        //const dispatch: AppDispatch = useDispatch();

        try {
            const response = await activateUserAccount(token)
            //dispatch(activateUserAccount(token))
            console.log(response)
            navigate('/login')

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='container'>
            <div>
                <h2>Hello {decoded.userName}! Click the button for activating your account</h2>
                <button onClick={handleActivate}>Activate user account</button>
            </div>
        </div>
    )
}

export default ActivatePage