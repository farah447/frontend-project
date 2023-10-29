import { useEffect } from 'react';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../redux/categories/categorySlice';

import AdminSidebar from './AdminSidebar'

const Category = () => {


  const { categories, isLoading, error } = useSelector((state: RootState) => state.categoriesR);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className='container'>
      <AdminSidebar />
      <div className='main-content'>
        <h2>List of all Categories</h2>
        <section>
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <article key={category.id} className='product'>
                  <h2>{category.name}</h2>
                  <button>Edite</button>
                  <button>Delete</button>
                </article>
              )
            })}
        </section>
      </div>
    </div>
  )
}

export default Category