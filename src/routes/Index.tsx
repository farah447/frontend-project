import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "../pages/Register";

import Home from "../pages/Home";
import AdminDashboared from "../pages/AdminDashboared";
import ProductsDetailes from "../pages/ProductsDetailes";
import UserDashboared from "../pages/UserDashboared";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Error from "../pages/Error";

import Category from "../components/Category";
import Products from "../components/Products";
import Footer from "../components/Footer";
import UserProfile from "../components/UserProfile";
import UserOrders from "../components/UserOrders";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";

import ProtectRouting from "./ProtectRouting";
import AdminRoute from "./AdminRoute";
import Cart from "../pages/Cart";
import { ThemeProvider } from "@mui/material";
import themes from "../Theme/Themes";
import ActivatePage from "../pages/ActivatePage";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";


const Index = () => {
  return (
    <ThemeProvider theme={themes}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductsDetailes />} />

          <Route path="/Contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login pathName={''} />} />
          <Route path="/logout" element={<Home />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<ProductsDetailes />} />
          <Route path="/users/activate/:token" element={<ActivatePage />} />

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboared />} />
            <Route path="admin/categories" element={<Category />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/users" element={<UserList />} />
            <Route path="admin/orders" element={<UserOrders />} />
          </Route>

          <Route path="/dashboard" element={<ProtectRouting />}>
            <Route path="user" element={<UserDashboared />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/orders" element={<UserOrders />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider >
  );
};

export default Index;
