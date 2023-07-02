import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route ,Navigate  } from "react-router-dom";
import {useSelector } from 'react-redux'
import Navbars from './components/Navbars';
import ScrollToTop from './components/ScrollToTop';
import Home from "./pages/Home.js"
import Signup from './pages/Signup.js'
import Login from './pages/Login.js'
import NewProduct from './pages/admin/NewProduct';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import EditProductPage from './pages/admin/EditProduct';
import AdminDashboard from './pages/admin/AdminDashboard';
import OrdersAdminPage from './pages/admin/OrdersAdminPage';
import Product from './pages/Product';
import CheckoutProduct from './pages/CheckoutProduct';
import EditUserPage from './pages/admin/EditUserPage';
import CreateUser from './pages/admin/CreateUser';
import Hom from "./pages/admin/Hom";
import Comment from './pages/Comment';
import CheckoutCOD from './components/CheckoutCOD';
import CheckoutFormStripe from './components/CheckoutFormStripe';
import ModalReview from './components/ModalReview';
import UserEdit from './pages/UserEdit';
// 
function App() {
  const user = useSelector ((state) => state.user)

  return (
    <div className="App">
            <BrowserRouter>
                <ScrollToTop />
                <Navbars/>
                <Routes>
                   
                    {/* <Route index element={<Home />} /> */}
                    {!user && (
                        <>
                            <Route path="/login" element={<Login />} />
                           
                            <Route path="/signup" element={<Signup />} />
                        </>
                    )}

                    {user && (
                        <>
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/orders" element={<OrdersPage />} />
                            <Route path="/checkout" element={<CheckoutProduct />} />
                            <Route path="/users/:id/edit" element={<UserEdit />} />
                        </>
                    )}
                    {user && user.isAdmin && (
                        <>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/product/:id/edit" element={<EditProductPage />} />
                            <Route path="/new-product" element={<NewProduct />} />
                            <Route path="/users/:id/edituser" element={<EditUserPage />} />
                            <Route path="/create-user" element={<CreateUser />} />
                            <Route path="/ordersadmin" element={<OrdersAdminPage />} />
                        </>
                    )}
                    <Route path="*" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/category/:category" element={<Product />} />
                    
                    {/* <Route path="/come" element={<Comment />} /> */}
                    {/* <Route path="/re" element={<ModalReview />} /> */}

                    {/*  */}
                    
                   
                </Routes>
            </BrowserRouter>
            
                
        </div>
  )
}

export default App;
