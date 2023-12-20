import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { ChangeEvent, useState } from "react";
import { Product, searchProduct } from "../redux/slices/products/productSlice";
import { Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { Button, IconButton, Stack } from "@mui/material";
import { prices } from "../price";
import { addToCart } from "../redux/cart/cartSlice";

import themes from '../Theme/Themes';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import useCategoryState from "../hooks/useCategoryState";

import SortProducts from "../components/SortProducts";
import SearchInput from "../components/SearchInput";


const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  const { products, isLoading, error, searchTerm } = useSelector((state: RootState) => state.productReducer);

  const { categories } = useCategoryState()

  const [checkedCategories, setCheckedCategories] = useState<number[]>([])

  const [priceRange, setPriceRange] = useState<number[]>([])

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(4);
  const [selectedPrice, setSelectedPrice] = useState<string>('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProduct(event.target.value))
  }


  const filerProducts = products.filter((product: any) => {
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

  const handleCheckedCategory = (CategoryId: string) => {
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filerProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filerProducts.length / itemsPerPage)

  const handlePageCange = (page: number) => {
    setCurrentPage(page)
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  let buttonElements = [];
  for (let i = 2; i <= totalPages - 1; i++) {
    buttonElements.push(<button onClick={() => { handlePageCange(i) }}>{i}</button>)
  }

  return (
    <ThemeProvider theme={themes}>
      <div className="all-main-content">
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
                        <div key={category._id}>
                          <label htmlFor="category" >
                            <input type="checkbox" name="category" value={category.title} onChange={() => { handleCheckedCategory(category._id) }} />
                            {category.title}
                          </label>
                        </div>
                      )
                    })}
                </div>
              </nav>
            </div>
            <div className="home-content">
              <div className="search-sort">
                <Stack direction="row" sx={{ width: 100 }}>
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
              {currentItems.length > 0 &&
                currentItems.map((product: Product) => {
                  return (
                    <div className="product-card">
                      <article key={product.id} className='product'>
                        <img src={product.image} alt={product.name} />
                        <h2 className="product-name">{product.name}</h2>
                        <h2>{product.description}</h2>
                        <h2>{product.price} EUR</h2>
                        <Stack direction="row" spacing={1}>
                          <div className="product-card-btn">
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
                          </div>
                        </Stack>
                      </article>
                    </div>
                  )
                })}
            </section>
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>previous</button>

              <button>{buttonElements}</button>

              <button onClick={handleNextPage} disabled={currentPage === totalPages}>next</button>
            </div>
          </div >
        </div >
      </div>
    </ThemeProvider >
  )
}

export default Home