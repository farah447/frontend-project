import { ThemeProvider } from '@mui/material'

import AdminSidebar from './AdminSidebar'
import themes from '../Theme/Themes'

const AdminOrders = () => {
  return (
    <ThemeProvider theme={themes} >
      <div className='container'>
        <AdminSidebar />
        <div className='main-content'>
          Orders content goes here
        </div>
      </div>
    </ThemeProvider>
  )
}

export default AdminOrders