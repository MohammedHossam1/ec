import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function FeaturedProducts() {
  // let [isLoading, setIsLoading] = useState(false);
  // let [products, setProducts] = useState([]);
  function getFeaturedProducts(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
 let {data,isLoading,isErorr,isFetch}= useQuery('featuredProducts',getFeaturedProducts)
 console.log(data?.data.data);
  // async function getProducts() {
  //   setIsLoading(true);
  //   let { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/products"
  //   );
  //   setIsLoading(false);
  //   setProducts(data.data);
  // }
  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (<>
     {isLoading==true?
        <div className="w-100 vh-100 d-flex align-items-center justify-content-center bg-info">
          {/* <i className="fa-solid fa-spinner text-white fa-10x fa-spin"></i> */}
          <i class="fa-solid fa-cart-shopping  fa-7x fa-fade text-main"></i>
          <span className="fa-7x fw-bold text-white">FreshCart</span>
          </div>
        :  <div>
        <div className="container py-2">
          <div className="row">
            {data?.data.data.map((product) => (
              <div key={product.id} className="col-sm-6 col-md-4 col-lg-2 ">
                <div className="product p-3 my-1">
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
                  <button className="btn bg-main w-100 text-white btn-sm mt-2">add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>} 
      </>
  );
}
