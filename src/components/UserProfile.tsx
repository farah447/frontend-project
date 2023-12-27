import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchUsers, updateUser } from '../redux/users/usersSlice';
import { ThemeProvider, Card, CardContent, Avatar, TextField, Button, Box, Typography } from '@mui/material';
import themes from '../Theme/Themes';
import UserSidebar from './UserSidebar';



const UserProfile = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReducer);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [user, setUser] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    Image: userData?.image || ''
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  console.log(userData?.userName)


  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setlastNameError] = useState('');

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const updateUserData = { userName: userData?.userName, ...user };
    dispatch(updateUser(updateUserData));
  };

  return (
    <ThemeProvider theme={themes}>
      <Box className='Profile-container' sx={{ display: 'flex' }}>
        <UserSidebar />
        <Box className='profile-main-content' sx={{ flexGrow: 1 }}>
          {userData && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={userData.image}
                    alt={userData.userName}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Typography variant="h6">User Name: {userData.userName}</Typography>
                  <Typography variant="body1">Name: {`${user?.firstName} ${user?.lastName}`}</Typography>
                  <Typography variant="body1">Email: {userData?.email}</Typography>
                  <Typography variant="body1">Role: {userData.isAdmin ? 'admin' : 'user'}</Typography>
                  <Button
                    variant="outlined"
                    onClick={handleFormOpen}
                    color="secondary"
                  >
                    Edit profile
                  </Button>
                </Box>
                {isFormOpen && (
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      autoComplete="fname"
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
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Update Profile
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserProfile;
