import { Button, FormControl, MenuItem, Select, Stack, TextField } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider } from '@mui/material/styles';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import themes from '../Theme/Themes';

import { createProducts, deleteProducts, fetchProducts, updateProduct } from '../redux/slices/products/productSlice';
import { AppDispatch, RootState } from '../redux/store';
import { fetchCategory } from '../redux/categories/categorySlice';
import AdminSidebar from './AdminSidebar';

const initialProductData = {
  _id: '',
  title: '',
  slug: '',
  price: '0',
  image: '',
  description: '',
  quantity: '0',
  category: '',
  sold: '0',
  shipping: '0'
};

const Products = () => {
  const { products, isLoading, error } = useSelector((state: RootState) => state.productReducer);
  const { categories } = useSelector((state: RootState) => state.categoriesReducer);

  const [isEdit, setIsEdit] = useState(false);
  const [productDatas, setProductData] = useState({ ...initialProductData });
  const [showForm, setShowForm] = useState(false);
  console.log(products)
  const dispatch: AppDispatch = useDispatch();

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 10 }));
    dispatch(fetchCategory());
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setProductData((prevProduct) => {
        return { ...prevProduct, category: categories[0]._id };
      });
    }
  }, [categories]);

  const handleEdit = (_id: string, price: string, title: string, slug: string, description: string, image: string, category: string, quantity: string, shipping: string, sold: string) => {
    setProductData({ _id, price, title, slug, description, image, category, quantity, shipping, sold });
    setIsEdit(true);
  };

  const handleDelete = async (slug: string) => {
    dispatch(deleteProducts(slug)).unwrap;
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
    console.log(productDatas)
    const formData = new FormData();
    formData.append('title', productDatas.title);
    formData.append('price', productDatas.price);
    formData.append('slug', productDatas.slug);
    formData.append('description', productDatas.description);
    if (productDatas.image) {
      formData.append('image', productDatas.image);
    }
    formData.append('category', productDatas.category);
    formData.append('shipping', productDatas.shipping);
    formData.append('quantity', productDatas.quantity);
    formData.append('sold', productDatas.sold);
    console.log(formData)

    if (!isEdit) {
      dispatch(createProducts(formData))
      dispatch(fetchProducts({ page: 1, limit: 10 }));
    } else {
      dispatch(updateProduct(productDatas))
      dispatch(fetchProducts({ page: 1, limit: 10 }));
      console.log("not Edited")
    }
  }
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setProductData((prevProduct) => {
      return { ...prevProduct, [name]: value };
    });
  };

  return (
    <ThemeProvider theme={themes}>
      <div className="container-product-admin">
        <AdminSidebar />
        <div>
          <Button variant="outlined" color="primary" onClick={toggleForm}>
            {showForm ? 'Hide Form' : 'Show Form'}
          </Button>
          {showForm && (
            <>
              <h2>Create a product: </h2>
              <form action="" onSubmit={handleSubmit}>
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      label="price"
                      type="number"
                      name="price"
                      value={productDatas.price}
                      placeholder="Enter product price"
                      onChange={handleChange}
                    />
                    <TextField
                      label="title"
                      type="title"
                      name="title"
                      value={productDatas.title}
                      placeholder="Enter product title"
                      onChange={handleChange}
                    />
                    <TextField
                      label="slug"
                      type="slug"
                      name="slug"
                      value={productDatas.slug}
                      placeholder="Enter product slug"
                      onChange={handleChange}
                    />
                    <TextField
                      label="description"
                      type="description"
                      name="description"
                      value={productDatas.description}
                      placeholder="Enter product description"
                      onChange={handleChange}
                    />
                    <TextField
                      type="file"
                      name="image"
                      inputProps={{ accept: "image/*" }}
                      onChange={handleChange}
                    />
                    <label htmlFor='category'>Categories</label>
                    <Select
                      name="category"
                      id="category"
                      value={productDatas.category}
                      onChange={handleSelectChange}
                    >
                      {categories.map((category) => {
                        return <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
                      })}
                    </Select>
                    <TextField
                      label="quantity"
                      type="quantity"
                      name="quantity"
                      value={productDatas.quantity}
                      placeholder="Enter product quantity"
                      onChange={handleChange}
                    />
                    <TextField
                      label="shipping"
                      type="shipping"
                      name="shipping"
                      value={productDatas.shipping}
                      placeholder="Enter product shipping"
                      onChange={handleChange}
                    />
                    <TextField
                      label="sold"
                      type="sold"
                      name="sold"
                      value={productDatas.sold}
                      placeholder="Enter product sold"
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
            </>
          )}
          <h2> All products</h2>
          <section className="products-listing">
            {products.length > 0 &&
              products.map((product) => (
                <div className="product-card" key={product.slug}>
                  <article className="product">
                    <img src={product?.image} alt={product?.title} />
                    <h2>Name: {product.title}</h2>
                    <p>Description: {product.description}</p>
                    <p>Price: {product.price}</p>
                    <Button
                      className="btn"
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleEdit(product._id, String(product.price), product.title, product.slug, product.description, product.image, String(product.category), String(product.quantity), String(product.shipping), String(product.sold))}
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
