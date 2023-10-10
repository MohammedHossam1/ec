import React from 'react'
import Layout from './Component/Layout'
import Home from './Component/Home/Home'
import Categories from './Component/Categories/Categories'
import Cart from './Component/Cart/Cart'
import Brands from './Component/Brands/Brands'
import Products from './Component/Products/Products'
import Login from './Component/Login/Login'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import Address from './Component/Address/Address'
import Register from './Component/Register/Register'
import NotFound from './Component/NotFound/Notfound'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import UserContextProvider, { userContext } from './Context/UserContext'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'
import ForgetPassword from './Component/ForgetPassword/ForgetPassword'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast';
import { store } from './Component/Redux/store'
import { Provider } from 'react-redux'
import Allorders from './Component/Allorders/Allorders'
import ResetPassword from './Component/ForgetPassword/ResetPassword'
import VerifyPassword from './Component/ForgetPassword/VerifyPassword'
import CategoryContextProvider from './Context/CategoryContext'
import WishList from './Component/WishList/WishList'
let routes = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [

      { index: true, element: <Home /> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'forgetpassword', element: <ForgetPassword /> },
      { path: 'resetpassword', element: <ResetPassword /> },
      { path: 'verifypassword', element: <VerifyPassword /> },
      { path: 'address', element: <ProtectedRoute><Address /></ProtectedRoute> },
      { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <NotFound /> },
    ]
  }
])
export default function App() {
  return (
    <CategoryContextProvider>
    <CartContextProvider>
      <UserContextProvider>
        <Provider store={store}>
          <RouterProvider router={routes}></RouterProvider>
          <Toaster />
        </Provider>
      </UserContextProvider>

    </CartContextProvider>
    </CategoryContextProvider>
  
  )

}
