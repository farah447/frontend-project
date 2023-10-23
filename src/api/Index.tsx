import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AdminDashboared from "../pages/AdminDashboared";
import Category from "../components/Category";
import Products from "../components/Products";
import ProductsDetailes from "../pages/ProductsDetailes";
import UserDashboared from "../pages/UserDashboared";
import Contact from "../pages/Contact";
import Login from "../pages/login";
import Error from "../pages/Error";
import Footer from "../components/Footer";
import AdminOrders from "../components/AdminOrders";
import UserProfile from "../components/UserProfile";
import UserOrders from "../components/UserOrders";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";

const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path='/products' element={<ProductsDetailes />} />
        <Route path='/dashboared/User' element={<UserDashboared />} />
        <Route path='/dashboared/User/profile' element={<UserProfile />} />
        <Route path='/dashboared/User/orders' element={<UserOrders />} />
        <Route path='/dashboared/Admin' element={<AdminDashboared />} />
        <Route path='/dashboard/Admin/category' element={<Category />} />
        <Route path='/dashboard/Admin/products' element={<Products />} />
        <Route path='/dashboard/Admin/Orders' element={<AdminOrders />} />
        <Route path='/dashboard/Admin/users' element={<UserList />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Index;
