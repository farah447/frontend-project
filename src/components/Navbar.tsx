import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { logoutUser } from '../redux/users/usersSlice';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import themes from '../Theme/Themes';
import { ThemeProvider } from '@mui/material/styles';

const Navbar = () => {
    const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReducer);
    const { cartItems } = useSelector((state: RootState) => state.cartReducer);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <ThemeProvider theme={themes}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem component={Link} to="/" onClick={handleClose}>Home</MenuItem>
                        <MenuItem component={Link} to="/contact" onClick={handleClose}>Contact</MenuItem>
                        {isLoggedIn ? (
                            <>
                                <MenuItem component={Link} to="/logout" onClick={handleLogout}>Logout</MenuItem>
                            </>
                        ) : (
                            <>
                                <MenuItem component={Link} to="/register" onClick={handleClose}>Register</MenuItem>
                                <MenuItem component={Link} to="/login" onClick={handleClose}>Login</MenuItem>
                            </>
                        )}
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Future Tech
                    </Typography>
                    <IconButton
                        size="large"
                        aria-label="show cart items"
                        color="inherit"
                        component={Link}
                        to="/cart"
                    >
                        <Badge badgeContent={cartItems.length} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    {isLoggedIn && (
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <MenuItem component={Link} to={`/dashboard/${userData?.isAdmin ? 'admin' : 'user'}`} onClick={handleClose}>
                                <AccountCircle />
                            </MenuItem>
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

export default Navbar