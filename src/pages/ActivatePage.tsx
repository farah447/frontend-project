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
    //const dispatch = useDispatch();
    const dispatch: AppDispatch = useDispatch();


    const handleActivate = async () => {

        try {
            const response = dispatch(activateUserAccount(String(token)))
            //await dispatch(activateUserAccount(String(token)))
            /*if (response.payload === 200) {
                navigate('/login');
            }*/
            //console.log(response)
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