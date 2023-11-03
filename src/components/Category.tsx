import { ChangeEvent, FormEvent, useState } from 'react';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { addCategory, deleteCategory, fetchCategory, updateCategory } from '../redux/categories/categorySlice';
import { ThemeProvider } from '@mui/material/styles';
import { Button, Stack, FormControl, TextField } from "@mui/material";

import themes from '../Theme/Themes';
import AdminSidebar from './AdminSidebar'
import useCategoryState from '../hooks/useCategoryState';

const Category = () => {


  const { categories, isLoading, error } = useCategoryState()
  const [categoryName, setCategoryName] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [categoryId, setCategoryId] = useState(0)


  const dispatch: AppDispatch = useDispatch()


  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const handleEdit = (id: number, name: string) => {
    setCategoryId(id)
    setIsEdit(!isEdit)
    setCategoryName(name)
  }

  const handleDelete = (id: number) => {
    dispatch(deleteCategory(id))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!isEdit) {
      const newCategory = { id: new Date().getTime(), name: categoryName }
      dispatch(addCategory(newCategory))
    } else {
      const updateCategoryData = { id: categoryId, name: categoryName }
      dispatch(updateCategory(updateCategoryData))
    }
    setCategoryName('')
  }

  return (
    <div className='container-ctegory'>
      <ThemeProvider theme={themes} >
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
                <article key={category.id} className='product'>
                  <h2>{category.name}</h2>
                  <Stack direction="row" spacing={2}>
                    <Button
                      className="Update"
                      variant="outlined"
                      color="secondary"
                      size='small'
                      onClick={() => { handleEdit(category.id, category.name) }}>
                      Edit </Button>
                    <Button
                      className="Delete"
                      variant="outlined"
                      color="secondary"
                      size='small'
                      onClick={() => {
                        handleDelete(category.id)
                      }}>
                      Delete </Button>
                  </Stack>
                </article>
              )
            })}
        </section>
      </ThemeProvider>
    </div>

  )
}

export default Category