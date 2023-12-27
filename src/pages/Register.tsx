import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser, fetchUsers } from '../redux/users/usersSlice';
import { ThemeProvider, Card, CardContent, TextField, Button, Typography, Box, Container } from '@mui/material';
import themes from '../Theme/Themes';
import { AppDispatch } from '../redux/store';

export const Register = () => {

    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const [user, setUser] = useState({
        _id: '',
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        image: '',
    })

    const [firstNameError, setfirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [userNameError, setuserNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setpasswordError] = useState('')


    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.target.type === 'file') {
            console.log('file selected')
            const fileInput = (event.target as HTMLInputElement) || ''
            setUser((prevUser) => {
                return { ...prevUser, [event.target.name]: fileInput.files?.[0] }
            })
        } else {
            setUser((prevUser) => {
                return { ...prevUser, [event.target.name]: event.target.value }
            })
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData()
        formData.append('firstName', user.firstName)
        formData.append('lastName', user.lastName)
        formData.append('userName', user.userName)
        formData.append('email', user.email)
        formData.append('password', user.password)
        formData.append('image', user.image | '')

        try {
            dispatch(createUser(formData));
        } catch (error) {
            console.log(error.response.data.message)
        }

        if (user.firstName.length < 2) {
            setfirstNameError('first name must be atleast 2 characters')
            return
        }
        else if (user.lastName.length < 2) {
            setLastNameError('last name must be atleast 2 characters')
            return
        }
        else if (user.email.length < 2) {
            setEmailError('email must be atleast 3 characters')
            return
        }
        else if (user.password.length < 5) {
            setpasswordError('password must be atleast 5 characters')
            return
        }
        else if (user.userName.length < 5) {
            setuserNameError('user name must be atleast 3 characters')
            return
        }
        navigate('/login');

    };

    return (
        <ThemeProvider theme={themes}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Card>
                        <CardContent>
                            <Typography component="h1" variant="h5">
                                User Registration
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="fname"
                                    autoFocus
                                    value={user.firstName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    value={user.lastName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User name"
                                    type="text"
                                    name="userName"
                                    value={user.userName}
                                    onChange={handleChange}
                                    error={Boolean(userNameError)}
                                    helperText={userNameError}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                                <div className='form-field'>
                                    <label htmlFor='image'>Image: </label>
                                    <input type='file' name='image' accept='image/*' onChange={handleChange} required />
                                </div>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Register
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
