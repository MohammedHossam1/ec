import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CartConext } from '../../Context/CartContext'

export default function Allorders() {
  let {cartId}=useContext(CartConext)
  let [orders,setOrders]=useState(null)
  // console.log("cart"+cartId);
  async function getOrders(cartId){
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`)
setOrders(data)
    // console.log(data);
  }
  useEffect(()=>{
    // getOrders()
  },[])
  return (
    <div>

    </div>
  )
}
