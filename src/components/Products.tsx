import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { createProducts, deleteProducts, fetchProducts, updateProduct } from '../redux/slices/products/productSlice';
import { ThemeProvider } from '@mui/material/styles';
import { Button, FormControl, Stack, TextField } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import themes from '../Theme/Themes';
import AdminSidebar from './AdminSidebar';
import { fetchCategory } from '../redux/categories/categorySlice';

const initialProductData = {
  _id: '',
  title: '',
  price: '0',
  image: null,
  description: '',
  quantity: '0',
  category: '',
  shipping: '0'
};

const Products = () => {
  const { products, isLoading, error } = useSelector((state: RootState) => state.productReducer);
  const { categories } = useSelector((state: RootState) => state.categoriesReducer);
  const [isEdit, setIsEdit] = useState(false);
  const [productData, setProductData] = useState({ ...initialProductData });
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 10 }));
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      setProductData((prevProduct) => {
        return { ...prevProduct, category: categories[0]._id };
      });
    }
  }, [categories]);

  const handleDelete = (_id: string) => {
    dispatch(deleteProducts(_id));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    if (type === 'file') {
      const fileInput = event.target as HTMLInputElement;
      setProductData((prevProduct) => {
        return { ...prevProduct, [name]: fileInput.files?.[0] };
      });
    } else {
      setProductData((prevProduct) => {
        return { ...prevProduct, [name]: value };
      });
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('price', productData.price);
    formData.append('description', productData.description);
    if (productData.image) {
      formData.append('image', productData.image);
    }
    formData.append('category', productData.category);
    formData.append('shipping', productData.shipping);
    formData.append('quantity', productData.quantity);

    dispatch(createProducts(formData))
  }
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setProductData((prevProduct) => {
      return { ...prevProduct, [name]: value };
    });
  };

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  // if (error) {
  //   return <p>{error}</p>;
  // }


  // const handleEdit = (_id: string, title: string, description: string, image: string, category: string, quantity: number) => {
  //   setProductData({ _id, title, description, image, category, quantity });
  //   setIsEdit(true);
  // };


  return (
    <ThemeProvider theme={themes}>
      <div className="container-product-admin">
        <AdminSidebar />
        <div>
          <h2>Create a product: </h2>
          <form action="" onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="ID"
                  type="number"
                  name="_id"
                  value={productData._id}
                  placeholder="Enter product ID"
                  onChange={handleChange}
                />
                <TextField
                  label="Name"
                  type="text"
                  name="title"
                  value={productData.title}
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
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  onChange={handleChange}
                />
                <label htmlFor='category'>Categories</label>
                <Select
                  name="category"
                  id="category"
                  value={productData.category}
                  onChange={handleSelectChange}
                >
                  {categories.map((category) => {
                    return <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
                  })}
                </Select>
                <TextField
                  label="quantity"
                  type="text"
                  name="quantity"
                  value={productData.quantity}
                  placeholder="Enter product quantity"
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
          <h2> All products</h2>
          <section className="products-listing">
            {products.length > 0 &&
              products.map((product) => (
                <div className="product-card" key={product._id}>
                  <article className="product">
                    <img src={product.image} alt={product.title} />
                    <h2>Name: {product.title}</h2>
                    <p>Description: {product.description}</p>
                    <p>Price: {product.price}</p>
                    <Button
                      className="btn"
                      variant="outlined"
                      color="secondary"
                    //onClick={() => handleEdit(product._id, product.title, product.description, product.image, product.category, product.quantity)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btn"
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(product.slug)}
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
