import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/users/UsersSlice'
import { AppDispatch, RootState } from '../redux/store'
import { useSelector } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles';

import themes from '../Theme/Themes';

const Navbar = () => {

    const { isLoggedIn, userData } = useSelector((state: RootState) => state.UsersR)

    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }


    return (
        <ThemeProvider theme={themes} >
            <nav>
                <ul className="horizontal-nav">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    {/*

                 <li>
                    <Link to="/dashboard/Admin">Admin Dashboared</Link>
                </li>

                <li>
                    <Link to="/dashboard/User">User Dashboared</Link>
                </li>
                */}
                    {isLoggedIn && (
                        <>
                            <li>
                                <Link to="/logout" onClick={handleLogout}>Logout</Link>
                            </li>

                            <li>
                                <Link to={`/dashboard/${userData?.role}`}> {userData?.role} Dashboared</Link>
                            </li>
                        </>
                    )
                    }
                    {!isLoggedIn && (
                        <>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </ThemeProvider>
    )
}

export default Navbar