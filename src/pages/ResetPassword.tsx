import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../redux/users/usersSlice';
import { Card, CardContent, TextField, Button, Typography, Box } from '@mui/material';
import { AppDispatch } from '../redux/store';

const ResetPassword = () => {
    const dispatch: AppDispatch = useDispatch();

    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { token } = useParams();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (token) {
            dispatch(resetPassword({ password, token }));
            console.log('Password was reset');
            navigate('/login');
        } else {
            console.log('Token is not available');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                '& .MuiCard-root': {
                    minWidth: 275,
                    maxWidth: 400,
                    margin: 2,
                },
            }}
        >
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Reset Password
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            id="password"
                            label="New Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required
                            margin="normal"
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reset Password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ResetPassword