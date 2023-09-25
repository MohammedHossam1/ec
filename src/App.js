import React from 'react'
import Layout from './Component/Layout'
import Home from './Component/Home/Home'
import Categories from './Component/Categories/Categories'
import Cart from './Component/Cart/Cart'
import Brands from './Component/Brands/Brands'
import Products from './Component/Products/Products'
import Login from './Component/Login/Login'
import Register from './Component/Register/Register'
import NotFound from './Component/NotFound/Notfound'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CounterContextProvider from './Context/context'
import UserContextProvider, { userContext } from './Context/UserContext'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'

let routes = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [

      { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <NotFound /> },
    ]
  }
])
export default function App() {
  return (
      <UserContextProvider>
        <CounterContextProvider>
          <RouterProvider router={routes}></RouterProvider>
        </CounterContextProvider>
      </UserContextProvider>
  )
}
