import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { useSelector } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles';
import { Button, IconButton } from '@mui/material'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import themes from '../Theme/Themes';
import { logoutUser } from '../services/userService'

const Navbar = () => {

    const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReducer)

    const { cartItems } = useSelector((state: RootState) => state.cartReducer)

    //const dispatch: AppDispatch = useDispatch()

    const navigate = useNavigate();

    const handleLogout = async () => {
        await (logoutUser())
        navigate('/login')
    }

    return (
        <ThemeProvider theme={themes} >
            <div className="navbar">
                <div className="nav-logo">
                    <img src="./src/Tech-logo-nav.png" height="100%" width="100%" alt="Future Tech Logo" />
                </div>
                <nav>
                    <ul className="horizontal-nav">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                        {isLoggedIn && (
                            <>
                                <li>
                                    <Link to="/logout" onClick={handleLogout}>Logout</Link>
                                </li>

                                <li>
                                    <Link to={`/dashboard/${userData && userData.isAdmin ? 'admin' : 'user'}`}> {userData && userData?.isAdmin} Dashboared</Link>
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
                        <li>
                            <Link to="/cart">
                                <Button
                                    className="Add-btn"
                                    size="small"
                                    value={cartItems.length > 0 ? cartItems.length : 0}>
                                    <IconButton color="primary" aria-label="add to shopping cart" size="small">
                                        <AddShoppingCartIcon />
                                    </IconButton>
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </ThemeProvider>
    )
}

export default Navbar