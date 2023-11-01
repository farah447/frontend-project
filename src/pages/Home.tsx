import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { Product, fetchProducts, searchProduct } from "../redux/slices/products/productSlice";
import { Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";

import DraftsIcon from '@mui/icons-material/Drafts';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortProducts from "../components/SortProducts";
import SearchInput from "../components/SearchInput";
import themes from '../Theme/Themes';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import useCategoryState from "../hooks/useCategoryState";

const Home = () => {
  const { products, isLoading, error, searchTerm } = useSelector((state: RootState) => state.productR);

  const { categories } = useCategoryState()

  const [checkedCategories, setCheckedCategories] = useState<string[]>([])

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

  const handleCheckedCategory = (CategoryName: string) => {
    if (checkedCategories.includes(CategoryName)) {
      const filteredCategory = checkedCategories.filter((c) => c !== CategoryName)
      setCheckedCategories(filteredCategory)
    } else {
      setCheckedCategories((prevState) => {
        return [...prevState, CategoryName]
      })
    }
  }

  console.log(checkedCategories)

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
        <div className="content-container">
          <div className="sidebar">
            <Box sx={{ width: '100%', maxWidth: 360 }}>
              <nav aria-label="main mailbox folders">
                <List>
                  <div>
                    {categories.length > 0 &&
                      categories.map((category) => {
                        return (
                          <div key={category.id}>
                            <label htmlFor="category" >
                              <input type="checkbox" name="category" value={category.name} onChange={() => { handleCheckedCategory(category.name) }} />
                              {category.name}
                            </label>
                          </div>
                        )
                      })}
                  </div>
                  <div>
                    <ListItem disablePadding >
                      <ListItemButton>
                        <ListItemIcon>
                          <FilterListIcon />
                        </ListItemIcon>
                        <ListItemText primary="filtring" />
                      </ListItemButton>
                    </ListItem>
                  </div>
                  <div>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                      </ListItemButton>
                    </ListItem>
                  </div>
                </List>
              </nav>
              <Divider />
            </Box>
          </div>
          <div className="home-content">
            <div className="search-sort">
              <Stack direction="row" spacing={70} sx={{ width: 100 }}>
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
    </ThemeProvider >
  )
}

export default Home