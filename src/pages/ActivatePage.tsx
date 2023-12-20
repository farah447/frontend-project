import jwtDecode from 'jwt-decode'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux'
import { activateUserAccount } from '../redux/users/usersSlice'

const ActivatePage = () => {
    const { token } = useParams();
    const decoded = jwtDecode(String(token));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleActivate = async () => {
        const dispatch: AppDispatch = useDispatch();

        try {
            const response = await dispatch(activateUserAccount(String(token)))
            //await dispatch(activateUserAccount(String(token)))
            /*if (response.status === 200) {
                // If the activation was successful, navigate to the login route
                navigate('/login');
            }*/
            console.log(response)
            navigate('/login');

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