import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { useEffect } from 'react'
import { fetchProducts } from '../redux/slices/products/productSlice'

import AdminSidebar from './AdminSidebar'

const Products = () => {

  const { products, isLoading, error } = useSelector((state: RootState) => state.productR);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
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
        <h2>Create a product and form goes here</h2>
        <h2>List of all products</h2>
        <section className="products-list">
          {products.length > 0 &&
            products.map((product) => {
              return (
                <div className="product-card">
                  <article key={product.id} className='product'>
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <h2>{product.description}</h2>
                    <button>Edite</button>
                    <button>Delete</button>
                  </article>
                </div>
              )
            })}
        </section>
      </div>
    </div>
  )
}

export default Products