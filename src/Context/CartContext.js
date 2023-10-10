import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
//this context cart to make a function shred on the all components 
//it sending 1-api place to save in  2-productId the db want it (body) 3-the token to prove that the user loged in db want it(headers)
export let CartConext = createContext()

export default function CartContextProvider(proops) {
    let [cartId,setCartId]=useState(null)
 
let headers={token:localStorage.getItem('userToken')}
  
    //1-token
    function addToCart(productId,headers) {
        //2-api
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            //body   
            //PId
            productId
        }, {
            //header
            //1
            headers
        })
    }
    function addToWish(productId,headers) {
        //2-api
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            //body   
            //PId
            productId
        }, {
            //header
            //1
            
            headers
        })
    }
        function getCart(headers){
            return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
                headers
            }).then((response)=>response)
            .catch((err)=>err)
        }
        function DeleteCartItem(id){
            return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
                headers
            }).then((response)=>response)
            .catch((err)=>err)
        }
        function updateCartItem(id,count){
            return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
                count
            },{
                headers
            }).then((response)=>response)
            .catch((err)=>err)
        }
        function payOnline(cartId,values){
            return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000 `,{
                shippingAddress:values
                
                
            },{
                headers
            }).then((response)=>response)
            .catch((err)=>err)
        }
        async function getCartId(){
            
           let {data} = await getCart()
          setCartId(data?.data._id)
        //   console.log(cartId);

        } 
        useEffect(()=>{
            getCartId()
        },[])
        return <CartConext.Provider value={{cartId,addToCart,getCart,DeleteCartItem,updateCartItem,payOnline,addToWish}}>
        {proops.children}
    </CartConext.Provider>

}
