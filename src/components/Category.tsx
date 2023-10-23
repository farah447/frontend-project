import React from 'react'
import AdminSidebar from './AdminSidebar'

const Category = () => {
  return (
    <div className='container'>
      <AdminSidebar />
      <div className='main-content'>

        <form action=''>
          <input type='text' name='category' />
          <button>create category</button>
        </form>

        <h2>category content goes here </h2>
        <div>
          <p>category name</p>
          <button>Edit</button>
          <button>Delet</button>
        </div>
      </div>
    </div>
  )
}

export default Category