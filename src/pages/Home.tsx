import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, searchProduct, Product } from '../redux/slices/products/productSlice';
import { addToCart } from '../redux/cart/cartSlice';
import { AppDispatch, RootState } from '../redux/store';
import useCategoryState from '../hooks/useCategoryState';
import { prices } from '../price';
import { ThemeProvider, Button, IconButton, Stack, Typography, Container, Grid, Card, CardMedia, CardContent, CardActions, Pagination, Select, MenuItem, FormControl, InputLabel, Box, SelectChangeEvent } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import themes from '../Theme/Themes';
import SortProducts from '../components/SortProducts';
import SearchInput from '../components/SearchInput';


const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  const { products, isLoading, error, searchTerm, pagination } = useSelector((state: RootState) => state.productReducer);

  const { categories } = useCategoryState()

  const [checkedCategories, setCheckedCategories] = useState<number[]>([])

  const [priceRange, setPriceRange] = useState<number[]>([])

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(3);
  const [selectedPrice, setSelectedPrice] = useState<string>('');

  const formData = async () => {
    dispatch(fetchProducts({ page: currentPage, limit: itemsPerPage }));
  }

  useEffect(() => {
    formData()
  }, [currentPage, itemsPerPage]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProduct(event.target.value))
  }


  const filerProducts = products.filter((product: any) => {
    const categoryMatch = checkedCategories.length > 0 ? checkedCategories.some((id) => product.categories.includes(Number(id))) : product

    const pricehMatch = priceRange.length > 0 ? product.price >= priceRange[0] && product.price <= priceRange[1] : product

    const searchMatch = searchTerm !== '' ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : product
    return categoryMatch && searchMatch && pricehMatch
  })

  // if (isLoading) {
  //   return <p>Loading...</p>
  // }
  // if (error) {
  //   return <p>{error}</p>
  // }

  const handleCheckedCategory = (categoryId: number) => {
    if (checkedCategories.includes(Number(categoryId))) {
      const filteredCategory = checkedCategories.filter((c) => c !== categoryId)
      setCheckedCategories(filteredCategory)
    } else {
      setCheckedCategories((prevState) => {
        return [...prevState, categoryId]
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

  // const handlePageCange = (page: number) => {
  //   setCurrentPage(page)
  // }

  // const handleNextPage = () => {
  //   setCurrentPage(currentPage + 1)
  // }

  // const handlePrevPage = () => {
  //   setCurrentPage(currentPage - 1)
  // }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };


  // const handlePriceChange = (event: SelectChangeEvent<string>) => {
  //   const priceId = Number(event.target.value);
  //   const selectPriceObj = prices.find((price) => price.id === priceId);
  //   if (selectPriceObj) {
  //     setPriceRange(selectPriceObj.range);
  //   }
  // };

  // const handleCheckedCategory = (event: SelectChangeEvent<number[]>) => {
  //   const CategoryId = Number(event.target.value);
  //   if (checkedCategories.includes(CategoryId)) {
  //     const filteredCategory = checkedCategories.filter((c) => c !== CategoryId);
  //     setCheckedCategories(filteredCategory);
  //   } else {
  //     setCheckedCategories((prevState) => {
  //       return [...prevState, CategoryId];
  //     });
  //   }
  // }
  // let buttonElements = [];
  // for (let i = 2; i <= totalPages - 1; i++) {
  //   buttonElements.push(<button onClick={() => { handlePageCange(i) }}>{i}</button>)
  // }

  return (
    <ThemeProvider theme={themes}>
      <Container>
        {/* Hero Section */}
        <Box sx={{ my: 15 }}>
          {/* <Grid container spacing={2}> */}
          <Grid item xs={6} md={6}>
            <Typography variant="h2" component="h1" gutterBottom>
              Future Tech
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              A day full of Excellence! Discover amazing products at great prices.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="./products/11">
              Shop Now
            </Button>
          </Grid>
          {/* <Grid item xs={6} md={6}>
              <img src={'./src/Headphones-hero.png'} alt="Hero" style={{ width: '50%', height: 'auto' }} />
            </Grid> */}
          {/* </Grid> */}
        </Box>

        {/* Sidebar for Filtering */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box sx={{ borderRight: 1, borderColor: 'divider' }}>
              {/* Filter by Price */}
              <FormControl fullWidth>
                <InputLabel>Price</InputLabel>
                <Select
                  value={selectedPrice}
                  onChange={handlePriceChange}
                >
                  {prices.map((price) => (
                    <MenuItem key={price.id} value={price.id}>
                      {price.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Filter by Category */}
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  multiple
                  value={checkedCategories}
                  onChange={handleCheckedCategory}
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Product List */}
          <Grid item xs={12} md={9}>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
              <SortProducts />
            </Stack>
            <Grid container spacing={2}>
              {currentItems.map((product) => (
                <Grid item key={product.slug} xs={12} sm={6} md={4} lg={3}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.image}
                      alt={product.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton aria-label="add to cart" onClick={() => handleAddToCart(product)}>
                        <AddShoppingCartIcon />
                      </IconButton>
                      <Button size="small" component={Link} to={`/products/${product.slug}`}>
                        Show Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Home