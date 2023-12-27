import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts, fetchSingleProduct } from "../redux/slices/products/productSlice";
import { fetchCategory } from "../redux/categories/categorySlice";
import { ThemeProvider } from '@mui/material/styles';
import { Button, Stack } from "@mui/material";
import { addToCart } from "../redux/cart/cartSlice";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import themes from '../Theme/Themes';
import useProductState from "../hooks/useProductState";
import { AppDispatch, RootState } from "../redux/store";

interface Category {
  _id: string
  title: string
  slug: string
}

const ProductsDetailes = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { singleProduct, isLoading, error } = useProductState();
  const { categories } = useSelector((state: RootState) => state.categoriesReducer);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(slug));
    dispatch(fetchCategory());
    dispatch(fetchProducts({ page: 1, limit: 10 }));
  }, []);

  const getCategoryNameById = (_id: string) => {
    const category = categories.find((category) => category._id === _id);
    return category ? category.title : 'Category not found';
  };

  const handleAddToCart = (singleProduct: any) => {
    dispatch(addToCart(singleProduct));
  };

  return (
    <ThemeProvider theme={themes}>
      <div className="product-details">
        <h2>Product Details</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {singleProduct && (
          <>
            <img src={singleProduct.image || 'default-image-path'} alt={singleProduct.title} />
            <h3>Title: {singleProduct.title}</h3>
            <p>Description: {singleProduct.description}</p>
            <p>Price: {singleProduct.price} EUR</p>
            <p>Category: {getCategoryNameById(singleProduct.category)}</p>
            <p>Quantity: {singleProduct.quantity}</p>
            <p>Shipping: {singleProduct.shipping}</p>
            <div className="details-btn">
              <Stack direction="row" spacing={2}>
                <Button
                  className="btn-back"
                  variant="outlined"
                  onClick={() => navigate("/")}
                  color="secondary"
                  size="small">
                  Back To Home
                </Button>
                <Button
                  className="Add-btn"
                  variant="outlined"
                  size="small"
                  onClick={() => handleAddToCart(singleProduct)}
                >
                  <IconButton color="primary" aria-label="add to shopping cart" size="small">
                    <AddShoppingCartIcon />
                  </IconButton>
                  Add To Cart
                </Button>
              </Stack>
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ProductsDetailes;
