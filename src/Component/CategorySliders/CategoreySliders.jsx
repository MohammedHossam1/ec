import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
export default function CategoreySliders() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    // autoplay:true,
    slidesToScroll: 1,
  };
  function getCat() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data, isLoading, isError } = useQuery("CatSlider", getCat);
  console.log(isLoading);
  return (
    <>
  
        <>
          <Slider {...settings}>
            {data?.data.data.map((cat) => (
              <img
                key={cat._id}
                src={cat.image}
                height={200}
                className="w-100 object-fit-cover my-3"
              />
            ))}
          </Slider>

        
        </>
      
    </>
  );
}
