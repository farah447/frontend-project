import { useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch } from 'react-redux'

import { ProductForm } from './ProductForm'
import { addProduct, Product } from '../redux/slices/products/productSlice'
import { AppDispatch } from '../redux/store'
import Category from './Category'

interface Category {
  _id: string
  title: string
  slug: string
}

const initialProductState: Product = {
  _id: '',
  title: '',
  slug: '',
  price: 0,
  image: '',
  description: '',
  quantity: 0,
  category: [],
  sold: 0,
  shipping: 0,
}

export function NewProductWrapper() {
  const dispatch = useDispatch<AppDispatch>()
  const [product, setProduct] = useState<Product>(initialProductState)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    const isList = name === 'categories' || name === 'variants' || name === 'sizes'
    if (isList) {
      setProduct({
        ...product,
        [name]: value.split(',')
      })
      return
    }

    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('New product data:', product)
    product._id = (+new Date()).toString()
    console.log('product:', product)

    dispatch(addProduct({ product }))
    setProduct(initialProductState)
  }

  return (
    <div>
      <h3 className="text-2xl font-bold">Add a new product</h3>
      <ProductForm handleSubmit={handleSubmit} handleChange={handleChange} product={product} />
    </div>
  )
}
