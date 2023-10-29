import { Link } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';

import themes from '../Theme/Themes';
import UseUserState from '../hooks/UseUserState'


const UserSidebar = () => {
    const { userData } = UseUserState()

    return (
        <ThemeProvider theme={themes} >
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
        </ThemeProvider>
    )
}

export default UserSidebar