import { ThemeProvider } from '@mui/material/styles';

import AdminSidebar from '../components/AdminSidebar'
import themes from '../Theme/Themes';

const AdminDashboared = () => {
  return (
    <ThemeProvider theme={themes} >
      <div className='container-admin'>
        <AdminSidebar />
      </div>
    </ThemeProvider>
  )
}

export default AdminDashboared