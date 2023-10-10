import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { userContext } from "../../Context/UserContext";
import { useSelector } from "react-redux";
import { CategoryContext } from "../../Context/CategoryContext";
import { useQuery } from "react-query";
import axios from "axios";

export default function NavBar() {
  let { userToken, setUserToken } = useContext(userContext);

  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }
  const { categoryNavigate } = useContext(CategoryContext);
  function categorProducts(id) {
    categoryNavigate(id);
  }

  //cat
  function getCat() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data, isLoading, isError } = useQuery("catcot", getCat);

  return (
    <nav className="navbar shadow-sm navbar-expand-lg bg-body-tertiary">
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
          <li className="nav-item   d-flex">
            <NavLink className="nav-link p-2 " to="/">
              Home
            </NavLink>
          </li>
          {userToken !== null ? (
            <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item d-flex">
                <NavLink className="nav-link" to="/brands">
                  Brands
                </NavLink>
              </li>

              <li className="nav-item d-flex">
                <NavLink className="nav-link" to="/cart">
                  Cart
                </NavLink>
              </li>

              <li className="nav-item d-flex">
                <NavLink className="nav-link" to="/wishlist">
                  <i className="fas fa-heart mx-1"></i>
                  Wish list
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle  "
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to="/categories"
                >
                  Categories
                </NavLink>
                <ul className="dropdown-menu">
                  {data?.data.data.map((cat) => (
                    <li>
                      {" "}
                      <Link
                        to="/categories"
                        key={cat?._id}
                        onClick={() => categorProducts(cat?._id)}
                        className="p-1 cursor-pointer"
                      >
                        {cat?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          ) : (
            ""
          )}

          <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
            <div className="socialIc">
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
            </div>
            {userToken == null ? (
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </>
            ) : (
              <span
                className="nav-link cursor-pointer"
                onClick={() => logOut()}
              >
                <button className="Btn">
                  <div className="sign">
                  <i className="fa-solid fa-right-from-bracket text-white "></i>    
                                </div>

                  <div className="text">Logout</div>
                </button>
              </span>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
