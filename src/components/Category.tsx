import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { fetchCategory } from '../redux/categories/categorySlice';
import { ThemeProvider } from '@mui/material/styles';
import { Button, Stack, FormControl, TextField } from "@mui/material";

import themes from '../Theme/Themes';
import AdminSidebar from './AdminSidebar'
import useCategoryState from '../hooks/useCategoryState';
import { createCategory, deleteCategory, updateCategory } from '../redux/categories/categorySlice';

const Category = () => {


  const { categories, isLoading, error } = useCategoryState()
  const [categoryName, setCategoryName] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [categoryId, setCategoryId] = useState('')


  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  /*if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }*/

  const handleEdit = (_id: string, title: string) => {
    setCategoryId(_id)
    setIsEdit(!isEdit)
    setCategoryName(title)
  }

  const handleDelete = async (_id: string) => {
    dispatch(deleteCategory(_id))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!isEdit) {
      //const newCategory = { _id: new Date().getTime(), title: categoryName }
      dispatch(createCategory(categoryName))
    } else {
      //const updateCategoryData = { _id: categoryId, title: categoryName }
      dispatch(updateCategory({ _id: categoryId, title: categoryName }))
    }
    setCategoryName('')
  }

  return (
    <ThemeProvider theme={themes} >
      <div className='container-ctegory'>
        <AdminSidebar />
        <h2>Create a Category</h2>
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, minWidth: 100 }}>
            <Stack direction="row" spacing={2}>
              <TextField label="add category" type='text' name='category' value={categoryName} placeholder='Enter category name' onChange={handleChange} />
              <Button
                className="create-button"
                variant="outlined"
                color="secondary"
                size='small'
                type="submit">
                {isEdit ? 'Update' : 'Create'} </Button>
            </Stack>
          </FormControl>
        </form>
        <br />
        <section className='products'>
          {categories &&
            categories.map((category) => {
              return (
                <article key={category._id} className='product'>
                  <h2>{category.title}</h2>
                  <Stack direction="row" spacing={2}>
                    <Button
                      className="Update"
                      variant="outlined"
                      color="secondary"
                      size='small'
                      onClick={() => { handleEdit(category._id, category.title) }}>
                      Edit </Button>
                    <Button
                      className="Delete"
                      variant="outlined"
                      color="secondary"
                      size='small'
                      onClick={() => {
                        handleDelete(category._id)
                      }}>
                      Delete </Button>
                  </Stack>
                </article>
              )
            })}
        </section>
      </div>
    </ThemeProvider>
  )
}

export default Category