import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { ChangeEvent, useEffect } from "react";
import { Product, fetchProducts, searchProduct } from "../redux/slices/products/productSlice";
import { Link } from "react-router-dom";
import SortProducts from "../components/SortProducts";

const Home = () => {
  const { products, isLoading, error, searchTerm } = useSelector((state: RootState) => state.productR);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProduct(event.target.value))
  }

  const searchProducts = searchTerm ? products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())) : products

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
      <div className="home-content">
        <div className="search-sort">
          <input type="text" placeholder="Search by product name" value={searchTerm} onChange={handleSearch} />
          <SortProducts />
        </div>
        <h2>all products here</h2>
      </div>
      <section className="products-list">
        {searchProducts.length > 0 &&
          searchProducts.map((product: Product) => {
            return (
              <div className="product-card">
                <article key={product.id} className='product'>
                  <img src={product.image} alt={product.name} />
                  <h2>{product.name}</h2>
                  <h2>{product.description}</h2>
                  <h2>{product.price} EUR</h2>
                  <button>Add To Cart</button>
                  <Link to={`/products/${product.id}`}>
                    <button>Show Details</button>
                  </Link>
                </article>
              </div>
            )
          })}
      </section>
    </div>
  )
}

export default Home