import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartConext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { userContext } from '../../Context/UserContext'

export default function WishList() {
  let {addToCart}=useContext(CartConext)
  let {userToken}=useContext(userContext)
  let [wishData,setWishData]=useState(null)
  let [isLoading,setIsLoading]=useState(false)
  let [isDeleteLoading,setIsDeleteLoading]=useState(false)
let headers={token:userToken}
console.log(headers);
async function getWish(headers){
  try{
  setIsLoading(true)
  let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
    headers
  })
  setIsLoading(false)

  setWishData(data)
}catch(errr){

}
 

}
async function DeleteItem(id){
  // setIsLoading(true)
  setIsDeleteLoading(true)
  let{data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
    headers
  })
  // setIsLoading(false)
  setIsDeleteLoading(false)

  setWishData((prevData) => ({
    ...prevData,
    data: prevData.data.filter(product => product.id !== id)
  }));
}

function addWishToCart(id,headers){
  try{
  setIsLoading(true)
  addToCart(id,headers)
  setIsLoading(false)

  toast.success('Product added to cart')
  }
  catch(errr){
    // console.log("wisherr");
  toast.error(errr?.response.data.message);

  }

}




useEffect(() => {
  getWish(headers);
}, []);
  return (
    <>

  <div className="container my-5 shadow">
  {isLoading==true?<div className='d-flex justify-content-center align-items-center my-5'>
   <h2>Loading</h2>
    <div className='loader my-5 mx-2 '>

    </div>
  </div>:
  
  wishData?.data.map((product) => (
            <div key={product.id} className="row py-2 border-bottom">
              <div className="col-md-2 ">
                <img
                  className="w-100 border border-2 m-2"
                  src={product.imageCover}
                  alt=""
                />
              </div>
              <div className="col-md-8 d-flex align-items-center  mt-3">
                <div className="d-flex justify-content-between align-items-center ">
                  <div className="">
                    <h3 className=" h6">
                       {product.title}
                    </h3>
                    <h6 className="text-main">Price : {product.price}EGP</h6>
             {isDeleteLoading?
              <div className='loader'></div>
             :<button onClick={()=>DeleteItem(product.id)} className="btn p-0  "> 
                  <i className="fas fa-trash-can text-danger"></i> Remove
                 </button>}   
                  </div>
              
                </div>
              </div>
<div className="col-2 d-flex align-items-center ">
  <button onClick={()=>addWishToCart(product.id,headers)} className='btn bg-main text-white '>Add to cart</button>
</div>

            </div>
          ))}
          </div>
  </>
  )
}
