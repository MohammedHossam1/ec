import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import { CartConext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { userContext } from "../../Context/UserContext";
// import { useSelector } from "react-redux";

export default function ProductDetail() {
let {userToken}=useContext(userContext)
let headers={token:userToken}
let {addToCart}=useContext(CartConext)
async function addCart(id,headers){
  try{
  let response = await addToCart(id,headers)
    toast.success('Product successfully added')
  }
  catch(errr){
    toast.error(errr?.response.data.message);
  }
}
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay:true,
    slidesToScroll: 1,
  };
  let { id } = useParams();
  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  let { data } = useQuery("productDetails", () => getProductDetails(id));
  return (
    <div className="container py-2 my-5">
      <div className="row align-items-center py-2">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{data?.data.data.title}</title>
        </Helmet>
        <div className="col-md-4 p-3">
      
            <Slider {...settings}>
              {data?.data.data.images.map((img) => 
              <img key={data?.data.data.id} src={img} className="w-100 " />
              )}
            </Slider>
       
          
        </div>
        <div className="col-md-8">
          <div className=" p-3">
            <h2 className="h5">{data?.data.data.title}</h2>
            <p className="">{data?.data.data.description}</p>
            <h6 className="text-main">{data?.data.data.category?.name}</h6>
            <h6 className="text-main">{data?.data.data.price} EGP</h6>
            <div className="d-flex justify-content-between">
              <span></span>
              <span>
                <i className="fas fa-star rating-color"></i>
                {data?.data.data.ratingsAverage}
              </span>
            </div>
          </div>
          <button onClick={()=>addCart(data?.data.data.id,headers)} className="btn bg-main w-100 text-white btn-sm mt-3">
            {" "}
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
