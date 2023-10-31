import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { ChangeEvent, useEffect } from "react";
import { Product, fetchProducts, searchProduct } from "../redux/slices/products/productSlice";
import { Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { Button, IconButton, Stack } from "@mui/material";

import SortProducts from "../components/SortProducts";
import SearchInput from "../components/SearchInput";
import themes from '../Theme/Themes';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

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
      <div className="Home-container">
        <section className="hero">
          <div>
            <h1> Future Tech </h1>
            <p>A day full of Excellence! <br />
              Discover amazing products at great prices.</p>
            <Link to={"./products/11"}>
              <Button
                className="Shop-button"
                variant="outlined"
                size="large"
                color="primary">
                Shop Now</Button>
            </Link>
          </div>
          <div className="Hero-logo">
            <img src="./src/Headphones-hero.png" height="50%" width="50%" alt="Future Tech Logo" />
          </div>
        </section>
        <div className="container">
          <div className="sidebar">
          </div>
          <div className="home-content">
            <div className="search-sort">
              <Stack direction="row" spacing={90} sx={{ width: 1000 }}>
                <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
                <SortProducts />
              </Stack>
            </div>
            <div>
              <h2>filtring</h2>
            </div>
          </div>
          <div className="products-h2">
            <h2>Shop Products</h2>
          </div>
          <section className="products-list">
            {searchProducts.length > 0 &&
              searchProducts.map((product: Product) => {
                return (
                  <div className="product-card">
                    <article key={product.id} className='product'>
                      <img src={product.image} alt={product.name} />
                      <h2 className="product-name">{product.name}</h2>
                      <h2>{product.description}</h2>
                      <h2>{product.price} EUR</h2>
                      <Stack direction="row" spacing={1}>
                        <Button
                          className="Add-btn"
                          variant="outlined"
                          size="small">
                          <IconButton color="primary" aria-label="add to shopping cart" size="small">
                            <AddShoppingCartIcon />
                          </IconButton>
                          Add To Cart</Button>
                        <Link to={`/products/${product.id}`}>
                          <Button
                            className="show-btn"
                            variant="outlined"
                            size="small">
                            Show Details</Button>
                        </Link>
                      </Stack>
                    </article>
                  </div>
                )
              })}
          </section>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Home