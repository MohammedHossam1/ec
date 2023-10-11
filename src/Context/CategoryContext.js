import axios from 'axios'
import React, { createContext, useState } from 'react'
export let CategoryContext = createContext()

export default function CategoryContextProvider(proops) {
   let [catProduct,setcCatProduct]=useState(null)
   
    async function categoryNavigate(id){
        try{
        let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/?category=${id}`)
        setcCatProduct(data)
        }catch(err){

        }    
    }


    function CategoryList(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then((response)=>response)
        .catch((err)=>err)
    }
    return <CategoryContext.Provider value={{ CategoryList,categoryNavigate,catProduct }}>
        {proops.children}
    </CategoryContext.Provider>
}
