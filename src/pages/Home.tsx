import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Product, fetchProducts } from "../redux/slices/products/productSlice";

const Home = () => {
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
    <div className="container">
      <div className="sidebar">
        <h2>filter by price</h2>
        <h2>filter by category</h2>
      </div>
      <div className="main-content">
        <h2>searching and sorting</h2>
        <h2>all products here</h2>
      </div>
      <section className="products-list">
        {products.length > 0 &&
          products.map((product: Product) => {
            return (
              <div className="product-card">
                <article key={product.id} className='product'>
                  <img src={product.image} alt={product.name} />
                  <h2>{product.name}</h2>
                  <h2>{product.description}</h2>
                  <button>Add To Cart</button>
                  <button>Show Details</button>
                </article>
              </div>
            )
          })}
      </section>
    </div>
  )
}

export default Home