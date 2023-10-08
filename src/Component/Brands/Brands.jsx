import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Brands() {
  let [brands, setBrands] = useState(null);
  async function getBrands() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    setBrands(data);
    // console.log(

    // ));
  }
  useEffect(()=>{
    getBrands()
  },[])
  return <div className="container my-5">
    <div className="row">
      {brands!=null?brands?.data.map((brand)=><div className='col-md-3 border'>
      <img src={brand.image} className="w-100" alt="" />
     </div>):<div className="loader">
       </div>
     }
    {
    }
    </div>
  </div>;
}
