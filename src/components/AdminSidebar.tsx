import { Link } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';

import themes from '../Theme/Themes';

const AdminSidebar = () => {
    return (
        <ThemeProvider theme={themes} >
            <div className='Admin-container'>
                <aside className='sidebar'>
                    <div className="admin-profile">
                        <h2>Admin Profile</h2>
                        <p>farah alharbi</p>
                        <p>farah@gmail.com</p>
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