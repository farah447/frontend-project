import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import themes from '../Theme/Themes';
import useUserState from '../hooks/useUserState';
import { fetchUsers } from '../redux/users/usersSlice';
import { useEffect } from 'react';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';

const UserSidebar = () => {
    const { userData } = useUserState();

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <ThemeProvider theme={themes}>
            <aside className='sidebar'>
                <div className="User-profile">
                    <h2>User Profile</h2>
                    <p>{`${userData?.firstName} ${userData?.lastName}`}</p>
                    <p>{`${userData?.email}`}</p>
                </div>
                <div>
                    <ul className='horizontal-nav'>
                        <li>
                            <Link to="/dashboard/user/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/user/orders">Orders</Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </ThemeProvider>
    );
};

export default UserSidebar;
