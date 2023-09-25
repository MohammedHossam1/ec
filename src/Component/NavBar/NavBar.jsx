import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../Assets/images/freshcart-logo.svg'
import { CounterContext } from "../../Context/context";
import { userContext } from "../../Context/UserContext";
export default function NavBar() {
  let {counter}=useContext(CounterContext)
  let {userToken,setUserToken}=useContext(userContext)
  let navigate=useNavigate()
  function logOut(){
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          <img src={logo} className="w-100" alt="fresh market logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* if usertoken==the token / sign in -> */}
        {userToken!==null?
          <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex">
              <Link className="nav-link" to="home">
                Home 
              </Link>
              <Link className="nav-link" to="/products">
                Products
              </Link>
              <Link className="nav-link" to="/categories">
                Categories
              </Link>
              <Link className="nav-link" to="/brands">
                Brands
              </Link>
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
          </ul>:""}

          <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
            {userToken==null?<>
            <Link className="nav-link" to="">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link className="nav-link" to="">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link className="nav-link" to="">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link className="nav-link" to="">
              <i className="fab fa-tiktok"></i>
            </Link>
            <Link className="nav-link" to="">
              <i className="fab fa-youtube"></i>
            </Link>
            <Link className="nav-link" to="">
              <i className="fab fa-"></i>
            </Link>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/register">
              Register
            </Link></>:
            <span className="nav-link cursor-pointer" onClick={()=>logOut()}>
              Logout
            </span>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}
