import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ChangeEvent, FormEvent } from 'react';
import { addProduct, deleteProduct, fetchProducts, updateProduct } from '../redux/slices/products/productSlice';
import { ThemeProvider } from '@mui/material/styles';
import { Button, FormControl, Stack, TextField } from '@mui/material';

import themes from '../Theme/Themes';
import AdminSidebar from './AdminSidebar';
import useProductState from '../hooks/useProductState';

const Products = () => {
  const { products, isLoading, error, singleProduct } = useProductState();

  const [productData, setProductData] = useState({
    id: 0,
    name: '',
    description: '',
    image: '',
  });

  const [isEdit, setIsEdit] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  const handleEdit = (id: number, name: string, description: string, image: string) => {
    setProductData({ id, name, description, image });
    setIsEdit(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProductData({
      ...productData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!isEdit) {
      dispatch(addProduct(productData));
    } else {
      dispatch(updateProduct(productData));
    }

    // Clear the form fields after submission
    setProductData({
      id: 0,
      name: '',
      description: '',
      image: '',
    });

    setIsEdit(false);
  };

  return (
    <ThemeProvider theme={themes}>
      <div className="container">
        <AdminSidebar />
        <div>
          <h2>Create a product and form goes here</h2>
          <form action="" onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="ID"
                  type="number"
                  name="id"
                  value={productData.id}
                  placeholder="Enter product ID"
                  onChange={handleChange}
                />
                <TextField
                  label="Name"
                  type="text"
                  name="name"
                  value={productData.name}
                  placeholder="Enter product name"
                  onChange={handleChange}
                />
                <TextField
                  label="Description"
                  type="text"
                  name="description"
                  value={productData.description}
                  placeholder="Enter product description"
                  onChange={handleChange}
                />
                <TextField
                  label="Image"
                  type="text"
                  name="image"
                  value={productData.image}
                  placeholder="Enter product image URL"
                  onChange={handleChange}
                />
                <Button
                  className="create-button"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  type="submit"
                >
                  {isEdit ? 'Update' : 'Create'}
                </Button>
              </Stack>
            </FormControl>
          </form>
          <h2>List of all products</h2>
          <section className="products-listing">
            {products.length > 0 &&
              products.map((product) => (
                <div className="product-card" key={product.id}>
                  <article className="product">
                    <img src={product.image} alt={product.name} />
                    <h2>Name: {product.name}</h2>
                    <p>Description: {product.description}</p>
                    <Button
                      className="btn"
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleEdit(product.id, product.name, product.description, product.image)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btn"
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </article>
                </div>
              ))}
          </section>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Products;
