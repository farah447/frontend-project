import { Link } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';

import themes from '../Theme/Themes';
import { fetchUsers } from '../redux/users/usersSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import useUserState from '../hooks/useUserState';

const AdminSidebar = () => {
    const { userData } = useUserState();

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    return (
        <ThemeProvider theme={themes} >
            <div className='Admin-container'>
                <aside className='sidebar'>
                    <div className="admin-profile">
                        <h2>Admin Profile</h2>
                        <p>{`${userData?.firstName} ${userData?.lastName}`}</p>
                        <p>{`${userData?.email}`}</p>
                    </div>

                    <ul className='horizontal-nav'>
                        <li> <Link to="/dashboard/admin/categories">Category</Link></li>
                        <li>  <Link to="/dashboard/admin/products">Products</Link></li>
                        <li>  <Link to="/dashboard/admin/users">Users</Link></li>
                        <li>  <Link to="/dashboard/admin/orders">Orders</Link></li>

                    </ul>
                </aside>
            </div>
        </ThemeProvider>
    )
}

export default AdminSidebar