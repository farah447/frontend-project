import { useDispatch } from 'react-redux'
import { AppDispatch } from './redux/store'
import { useEffect } from 'react'
import { fetchProducts } from './redux/slices/products/productSlice'
import { fetchUsers } from './redux/users/usersSlice'
import { fetchCategory } from './redux/categories/categorySlice'
import { fetchOrders } from './redux/orders/ordersSlice'
import { ThemeProvider } from '@emotion/react'

import './App.css'
import Index from './routes/Index'
import themes from './Theme/Themes';

function App() {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 10 }))
    dispatch(fetchUsers())
    dispatch(fetchCategory())
    dispatch(fetchOrders())
  }, [])
  return (<ThemeProvider theme={themes}>
    <div className="App">
      <Index />
    </div>
  </ThemeProvider>
  )
}

export default App
