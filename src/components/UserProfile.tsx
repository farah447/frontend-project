import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { fetchUsers, updateUser } from '../redux/users/UsersSlice';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';

import themes from '../Theme/Themes';
import UserSidebar from './UserSidebar';
import UseUserState from '../hooks/UseUserState';

const UserProfile = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userData } = UseUserState();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName,
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return { ...prevUser, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const updateUserData = { id: userData?.id, ...user };
    dispatch(updateUser(updateUserData));
  };

  return (
    <div className='Profile-container'>
      <ThemeProvider theme={themes}>
        <UserSidebar />
        <div className='profile-main-content'>
          {userData && (
            <div>
              <div className="user-profile-data">
                <p>Id: {userData.id}</p>
                <p>Name: {`${userData?.firstName} ${userData?.lastName}`}</p>
                <p>Email: {userData.email}</p>
                <p>Role: {userData.role}</p>
                <Button
                  className="btn"
                  variant="outlined"
                  onClick={handleFormOpen}
                  color="secondary"
                >
                  Edit profile
                </Button>
              </div>

              {isFormOpen && (
                <form action="" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                  <Button
                    className="btn"
                    variant="outlined"
                    type="submit"
                    color="secondary"
                  >
                    Update the Profile
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default UserProfile;
