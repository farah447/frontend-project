import { Link } from 'react-router-dom'

import UseUserState from '../hooks/UseUserState'


const UserSidebar = () => {
    const { userData } = UseUserState()

    return (
        <aside className='sidebar'>
            <div className="User-profile">
                <h2>User Profile</h2>
                <p>{`${userData?.firstName} ${userData?.lastName}`}</p>
                <p>{`${userData?.email}`}</p>
            </div>
            <div>
                <ul className='horizontal-nav'>
                    <li> <Link to="/dashboard/User/profile">Profile</Link></li>
                    <li> <Link to="/dashboard/User/orders">Orders</Link></li>
                </ul>
            </div>
        </aside>
    )
}

export default UserSidebar