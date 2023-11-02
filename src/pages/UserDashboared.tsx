import UserSidebar from '../components/UserSidebar'
import { ThemeProvider } from '@mui/material/styles';

import themes from '../Theme/Themes';

const UserDashboared = () => {
  return (
    <ThemeProvider theme={themes}>
      <div className='container-user'>
        <UserSidebar />
        <div className='main-content'>
          <h2>User profile goes here</h2>
          <p>Main content goes here</p>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UserDashboared;
