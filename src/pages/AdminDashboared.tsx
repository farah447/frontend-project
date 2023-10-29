import { ThemeProvider } from '@mui/material/styles';

import AdminSidebar from '../components/AdminSidebar'
import themes from '../Theme/Themes';
const AdminDashboared = () => {
  return (
    <ThemeProvider theme={themes} >
      <div className='container'>
        <h2>Admin profile gose here</h2>
        <AdminSidebar />
        <div className='main-content'>
          main content goes here
        </div>
      </div>
    </ThemeProvider>
  )
}

export default AdminDashboared