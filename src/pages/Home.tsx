import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { Product, fetchProducts, searchProduct } from "../redux/slices/products/productSlice";
import { Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";

import FilterListIcon from '@mui/icons-material/FilterList';
import SortProducts from "../components/SortProducts";
import SearchInput from "../components/SearchInput";
import themes from '../Theme/Themes';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import useCategoryState from "../hooks/useCategoryState";
import { prices } from "../price";
import { addToCart } from "../redux/cart/cartSlice";


const Home = () => {
  const { products, isLoading, error, searchTerm } = useSelector((state: RootState) => state.productR);

  const { categories } = useCategoryState()

  const [checkedCategories, setCheckedCategories] = useState<number[]>([])

  const [priceRange, setPriceRange] = useState<number[]>([])

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProduct(event.target.value))
  }

  //const searchProducts = searchTerm ? products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())) : products

  const filerProducts = products.filter((product) => {
    const categoryMatch = checkedCategories.length > 0 ? checkedCategories.some((id) => product.categories.includes(Number(id))) : product

    const pricehMatch = priceRange.length > 0 ? product.price >= priceRange[0] && product.price <= priceRange[1] : product

    const searchMatch = searchTerm !== '' ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : product
    return categoryMatch && searchMatch && pricehMatch
  })

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const handleCheckedCategory = (CategoryId: number) => {
    if (checkedCategories.includes(CategoryId)) {
      const filteredCategory = checkedCategories.filter((c) => c !== CategoryId)
      setCheckedCategories(filteredCategory)
    } else {
      setCheckedCategories((prevState) => {
        return [...prevState, CategoryId]
      })
    }
  }

  const handlePriceChange = (priceId: number) => {
    const selectPriceObj = prices.find((price) => price.id === priceId);
    if (selectPriceObj) {
      setPriceRange(selectPriceObj.range)
    }
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  return (
    <ThemeProvider theme={themes}>
      <div className="Home-container">
        <div className="hero-container">
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
        </div>
        <div className="content-container-filter" >
          <div className="sidebar">
            <nav aria-label="main mailbox folders">
              <div>
                <h2>Filter price:</h2><br />
                {prices.length > 0 && prices.map((price) => {
                  return (
                    <div key={price.id}>
                      <label htmlFor="price" >
                        <input type="radio" name="price" value={price.id} onChange={() => { handlePriceChange(price.id) }} />
                        {price.name}
                      </label>
                    </div>)
                })}
              </div>
              <div>
                <br /> <h2>Filter category:</h2><br />
                {categories.length > 0 &&
                  categories.map((category) => {
                    return (
                      <div key={category.id}>
                        <label htmlFor="category" >
                          <input type="checkbox" name="category" value={category.name} onChange={() => { handleCheckedCategory(category.id) }} />
                          {category.name}
                        </label>
                      </div>
                    )
                  })}
              </div>
            </nav>
          </div>
          <div className="home-content">
            <div className="search-sort">
              <Stack direction="row" spacing={60} sx={{ width: 100 }}>
                <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
                <SortProducts />
              </Stack>
            </div>
            <div>
            </div>
          </div>
          <div className="products-h2">
            <h2>Shop Products</h2>
          </div>
          <section className="products-list" style={{ height: '100vh', overflow: 'auto' }}>
            {filerProducts.length > 0 &&
              filerProducts.map((product: Product) => {
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
                          size="small"
                          onClick={() => { handleAddToCart(product) }}>
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
    </ThemeProvider >
  )
}

export default Home