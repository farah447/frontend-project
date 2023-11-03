import { ThemeProvider } from '@mui/material/styles';

import UserSidebar from '../components/UserSidebar'
import themes from '../Theme/Themes';

const UserDashboared = () => {
  return (
    <ThemeProvider theme={themes}>
      <div className='container-user'>
        <UserSidebar />

      </div>
    </ThemeProvider>
  );
};

export default UserDashboared;
