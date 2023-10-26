import { Link } from 'react-router-dom'

const AdminSidebar = () => {
    return (
        <aside className='sidebar'>
            <div className="admin-profile">
                <h2>Admin Profile</h2>
                <p>farah alharbi</p>
                <p>farah@gmail.com</p>
            </div>

            <ul>
                <li> <Link to="/dashboard/Admin/category">Category</Link></li>
                <li>  <Link to="/dashboard/Admin/products">Products</Link></li>
                <li>  <Link to="/dashboard/Admin/users">Users</Link></li>
            </ul>
        </aside>
    )
}

export default AdminSidebar