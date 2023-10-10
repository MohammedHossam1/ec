import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategoreySliders() {
  const [sliderSettings, setSliderSettings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows:false,

  });

  const { data, isLoading, isError } = useQuery("CatSlider", getCat);

  useEffect(() => {
    function updateSliderSettings() {
      if (window.innerWidth <= 600) {
        setSliderSettings({
          ...sliderSettings,
          slidesToShow: 2,
          dots:true
        });
      } else {
        setSliderSettings({
          ...sliderSettings,
          slidesToShow: 7,
          dots:false
        });
      }
    }

    window.addEventListener('load', updateSliderSettings);
    window.addEventListener('resize', updateSliderSettings);

    return () => {
      window.removeEventListener('load', updateSliderSettings);
      window.removeEventListener('resize', updateSliderSettings);
    };
  }, [sliderSettings]);

  function getCat() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  return (
    <>
      <Slider {...sliderSettings}>
        {data?.data.data.map((cat) => (
          <div key={cat._id}>
            <img
              src={cat.image}
              alt={cat.name}
              height={200}
              className="w-100 object-fit-cover my-3"
            />
          </div>
        ))}
      </Slider>
    </>
  );
}
