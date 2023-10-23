import React from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'

const AdminDashboared = () => {
  return (
    <div className='container'>
      <h2>Admin profile gose here</h2>
      <AdminSidebar />
      <div className='main-content'>
        main content goes here
      </div>
    </div>
  )
}

export default AdminDashboared