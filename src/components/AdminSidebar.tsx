import { Link } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';

import themes from '../Theme/Themes';

const AdminSidebar = () => {
    return (
        <ThemeProvider theme={themes} >
            <aside className='sidebar'>
                <div className="admin-profile">
                    <h2>Admin Profile</h2>
                    <p>farah alharbi</p>
                    <p>farah@gmail.com</p>
                </div>

                <ul className='horizontal-nav'>
                    <li> <Link to="/dashboard/Admin/category">Category</Link></li>
                    <li>  <Link to="/dashboard/Admin/products">Products</Link></li>
                    <li>  <Link to="/dashboard/Admin/users">Users</Link></li>
                </ul>
            </aside>
        </ThemeProvider>
    )
}

export default AdminSidebar