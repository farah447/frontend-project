import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { forgetPassword } from '../redux/users/usersSlice';
import { ThemeProvider, Card, CardContent, TextField, Button, Typography, Box } from '@mui/material';
import themes from '../Theme/Themes';

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
        <ThemeProvider theme={themes}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Card sx={{ minWidth: 275, maxWidth: 500, m: 2 }}>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Forgot Password
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                margin="normal"
                                value={email}
                                onChange={handleChange}
                                required
                                variant="outlined"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Send Reset Password Email
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider>
    )
}

export default ForgetPassword