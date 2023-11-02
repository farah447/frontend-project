import { ThemeProvider } from '@mui/material/styles';

import AdminSidebar from '../components/AdminSidebar'
import themes from '../Theme/Themes';
const AdminDashboared = () => {
  return (
    <div className='container-admin'>
      <ThemeProvider theme={themes} >
        <AdminSidebar />
      </ThemeProvider>
    </div>
  )
}

export default AdminDashboared