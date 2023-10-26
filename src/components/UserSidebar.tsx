import { Link } from 'react-router-dom'

const UserSidebar = () => {
    return (
        <aside className='sidebar'>
            <div className="User-profile">
                <h2>User Profile</h2>
                <p>farah alharbi</p>
                <p>farah@gmail.com</p>
            </div>

            <ul>
                <li> <Link to="/dashboard/User/profile">Profile</Link></li>
                <li> <Link to="/dashboard/User/orders">Orders</Link></li>
            </ul>
        </aside>
    )
}

export default UserSidebar