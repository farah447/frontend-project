import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { ChangeEvent, useEffect } from "react";
import { Product, fetchProducts, searchProduct } from "../redux/slices/products/productSlice";
import { Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { Button } from "@mui/material";

import SortProducts from "../components/SortProducts";
import SearchInput from "../components/SearchInput";
import themes from '../Theme/Themes';

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
    <ThemeProvider theme={themes}>
      <div className="container">
        <div className="sidebar">
        </div>
        <div className="home-content">
          <div className="search-sort">
            <label htmlFor="search">Search:</label>
            <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
            <SortProducts />
          </div>
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
                    <Button
                      className="Add-btn"
                      variant="outlined">
                      Add To Cart</Button>
                    <Link to={`/products/${product.id}`}>
                      <Button
                        className="show-btn"
                        variant="outlined">
                        Show Details</Button>
                    </Link>
                  </article>
                </div>
              )
            })}
        </section>
      </div>
    </ThemeProvider>
  )
}

export default Home