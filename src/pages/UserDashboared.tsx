import UserSidebar from '../components/UserSidebar'
import { ThemeProvider } from '@mui/material/styles';

import themes from '../Theme/Themes';

const UserDashboared = () => {
  return (
    <ThemeProvider theme={themes} >
      <div className='container'>
        <UserSidebar />
        <div className='main-content'>
          <h2>User profile gose here</h2>
          <p>main content goes here</p>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default UserDashboared