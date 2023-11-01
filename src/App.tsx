import { useDispatch } from 'react-redux'
import { AppDispatch } from './redux/store'
import { useEffect } from 'react'
import { fetchProducts } from './redux/slices/products/productSlice'
import { fetchUsers } from './redux/users/UsersSlice'
import { fetchCategory } from './redux/categories/categorySlice'

import './App.css'
import Index from './routes/Index'
import { fetchOrders } from './redux/orders/ordersSlice'

function App() {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchUsers())
    dispatch(fetchCategory())
    dispatch(fetchOrders())
  }, [])
  return <div className="App">
    <Index />
  </div>
}

export default App
