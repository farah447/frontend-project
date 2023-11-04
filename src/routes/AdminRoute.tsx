import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet, useLocation } from 'react-router-dom'
import { Login } from '../pages/Login'

const AdminRoute = () => {

    const location = useLocation()


    const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReducer)

    return isLoggedIn && userData?.role === 'Admin' ? <Outlet /> : <Login pathName={location.pathname} />
}

export default AdminRoute