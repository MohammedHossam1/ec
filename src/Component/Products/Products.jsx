import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartConext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Products() {
  //this save addproduct in db
let [heartColor,setHeartColor]=useState('black')
  const { addToCart,addToWish } = useContext(CartConext);

  async function addProduct(productId) {
    try {
      let response = await addToCart(productId);
      if (response?.data.status == "success") {
        toast.success("Product successfully added", {
          duration: 3000,
        });
      } else {
        toast.error("Product didint added");
      }
      console.log("cart");
    } catch (errr) {
      console.log(errr);
    }
  }
  async function addProductWish(productId) {
    try {
      let response = await addToWish(productId);
      // if (response?.data.status == "success") {
        toast.success(response?.data.message);
      // } else {
        // toast.error("Product didint added");
      // }
      console.log(response);
      if (!heartColor[productId]) {
        setHeartColor((prevHeartColors) => ({
          ...prevHeartColors,
          [productId]: 'red',
        }));
      }
    } catch (errr) {
      console.log(errr);
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
        // <div className="w-100 vh-100 d-flex align-items-center justify-content-center bg-info">
        //   <i className="fa-solid fa-cart-shopping  fa-7x fa-fade text-main"></i>
        //   <span className="fa-7x fw-bold text-white">FreshCart</span>
        // </div>
        <div className="loader"></div>
      ) : (
        <div>
          <div className="container py-2">
            <div className="row">
              {data?.data.data.map((product) => (
                <div key={product.id} className="col-sm-6 col-md-4 col-lg-2 ">
                  <div className="product p-3 my-1">
                    <Link to={`/productDetails/${product.id}`}>
                      <img
                        className="w-100"
                        src={product.imageCover}
                        alt={product.title}
                      />
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
                    </Link>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        onClick={() => addProduct(product.id)}
                        className="btn bg-main w-100 text-white btn-sm mt-2"
                      >
                        add to cart
                      </button>
                      <button onClick={()=>addProductWish(product.id)} className="bg-main mx-2 mt-2  btn py-0 px-2">
                      <i  style={{ color: heartColor[product.id] || 'black' }} className="fas  fa-heart"></i>
                      </button >
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
