import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Brands() {
  let [brands, setBrands] = useState(null);
  async function getBrands() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
      );
      setBrands(data);
      
      // ));
    }
    useEffect(()=>{
      getBrands()
      // console.log(brands)
  },[])
  return <div className="container my-5">
    <div className="row g-4">
      {brands!=null?brands?.data.map((brand)=><div key={brand.id} className='col-md-3'>
        <div className="shadow">
      <img src={brand.image} className="w-100" alt="" />
     </div>
     </div>
     ):<div className="d-flex align-items-center my-5 justify-content-center">
      <h3>Loading</h3>
     <div className="loader mx-2"></div></div>

     }
    {
    }
    </div>
  </div>;
}
