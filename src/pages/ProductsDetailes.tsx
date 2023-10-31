import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts, findProductById } from "../redux/slices/products/productSlice";
import { fetchCategory } from "../redux/categories/categorySlice";
import { ThemeProvider } from '@mui/material/styles';
import { Button, Stack } from "@mui/material";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import themes from '../Theme/Themes';

const ProductsDetailes = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { singleProduct, isLoading, error } = useSelector((state: RootState) => state.productR);

  const { categories } = useSelector((state: RootState) => state.categoriesR);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts()).then(() => dispatch(findProductById(Number(id))))
    dispatch(fetchCategory()).then(() => dispatch(findProductById(Number(id))))
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const getCategoryNameById = (CategoryId: number) => {

    const category = categories.find((category) => category.id === CategoryId)
    return category ? category.name + ", " : 'Category not found!'
  }


  return (
    <ThemeProvider theme={themes} >
      <div>
        <h2> Product Details </h2>
        {singleProduct && <>
          <img src={singleProduct.image} alt={singleProduct.name} />
          <h3>Name:{singleProduct.name}</h3>
          <p>Description:{singleProduct.description}</p>
          <p>Price: {singleProduct.price} EUR</p>
          <p>Categories: {singleProduct.categories && singleProduct.categories.map((CategoryId) => getCategoryNameById(CategoryId))}</p>
          <p>Sizes: {singleProduct.sizes && singleProduct.sizes.join(`, `)}</p>
          <Stack direction="row" spacing={2}>
            <Button
              className="btn-back"
              variant="outlined"
              onClick={() => {
                navigate("/")
              }}
              color="secondary"
              size="small">
              Back To Home</Button>
            <Button
              className="btn-add"
              variant="outlined"
              color="secondary"
              size="small"
              aria-label="add to shopping cart">
              <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
              Add To Cart</Button>
          </Stack>
        </>}
      </div>
    </ThemeProvider>
  )
}

export default ProductsDetailes