import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { fetchUsers } from '../redux/users/usersSlice';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';

import themes from '../Theme/Themes';
import UserSidebar from './UserSidebar';
import useUserState from '../hooks/useUserState';
import { updateUser } from '../services/userService';

const UserProfile = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userData } = useUserState();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [user, setUser] = useState({
    userName: userData?.userName || '',
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

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

    const updateUserData = { id: userData?._id, ...user };
    await updateUser(updateUserData);
  };

  return (
    <ThemeProvider theme={themes}>
      <div className='Profile-container'>

        <UserSidebar />
        <div className='profile-main-content'>
          {userData && (
            <div>
              <div className="user-profile-data">
                <p>Id: {userData._id}</p>
                <p>Name: {`${user?.userName}`}</p>
                <p>Email: {userData?.email}</p>
                <p>Role: {userData.isAdmin ? 'Admin' : 'User'}</p>
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
                <div className='user-profile-data-input'>
                  <form action="" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="firstName"
                      value={user.userName}
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
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UserProfile;
