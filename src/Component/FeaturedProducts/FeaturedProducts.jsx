import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartConext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { userContext } from "../../Context/UserContext";

export default function FeaturedProducts() {
  //this save addproduct in db
  let [heartColor, setHeartColor] = useState("black");
  const { addToCart, addToWish } = useContext(CartConext);
  const {userToken} = useContext(userContext);
  let headers={token:userToken}

  async function addProduct(productId, headers) {
    try {
      let response = await addToCart(productId, headers);
      if (response?.data.status == "success") {
        toast.success("Product successfully added");
      } else {
        console.log("cs");
      }
    } catch (errr) {
      toast.error(errr?.response.data.message);
    }
  }


  // cons
  async function addProductWish(productId,headers) {
    try {
      let response = await addToWish(productId,headers);
      // if (response?.data.status == "success") {
      toast.success(response?.data.message);
    
      if (!heartColor[productId]) {
        setHeartColor((prevHeartColors) => ({
          ...prevHeartColors,
          [productId]: "red",
        }));
      }
    } catch (errr) {
      toast.error(errr?.response.data.message);
    }
  }

  //featuredproduct bring home data
  function getFeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { data, isLoading, isErorr, isFetch } = useQuery(
    "featuredProducts",
    getFeaturedProducts
  );

  return (
    <>
      {isLoading == true ? (
        <div className="loader"></div>
      ) : (
        <div>
          <div className="container pb-5 pt-2">
            <div className="row g-2">
              {data?.data.data.map((product) => (
                <div key={product.id} className="col-sm-6  col-md-4 col-lg-2 ">
                  <div className="product bg-white shadow-sm rounded-2 p-1 my-1">
                    <Link to={`/productDetails/${product.id}`}>
                      <img
                        className="w-100"
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <div className=" px-2 ">
                      <span className="text-main fw-bold font-sm">
                        {product.category.name}
                      </span>
                      <h3 className="h6 my-2 ">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className="d-flex justify-content-between">
                        <span className="">{product.price} EGP</span>
                        <span>
                          <i className="fa-solid fa-star rating-color"></i>
                          {product.ratingsAverage}
                        </span>
                        </div>
                      </div>
                    </Link>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        onClick={() => addProduct(product.id,headers)}
                        className="btn bg-main w-100 text-white btn-sm mt-2"
                      >
                        add to cart
                      </button>
                      <button
                        onClick={() => addProductWish(product.id,headers)}
                        className="bg-main mx-2 mt-2  btn py-0 px-2"
                      >
                        <i
                          style={{ color: heartColor[product.id] || "black" }}
                          className="fas  fa-heart"
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
