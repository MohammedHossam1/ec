import React from "react";
import slide1 from "../../Assets/images/Discount-On-Higher-Quantity-1.png";
import slide2 from "../../Assets/images//discount-strategy-guide-15.png";
import slide3 from "../../Assets/images/maxresdefault.jpg";
import blog1 from "../../Assets/images/Online-Discounts-A8-Vector0.png";
import blog2 from "../../Assets/images/descontos-no-ecommerce.jpg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
    arrows:false,

  };

  return (
    <>
      <div className="row gx-0 mt-2">
        <div className="col-md-9" >
          <Slider {...settings}>
            <img height={400} className="w-100" src={slide1} alt="" />
            <img height={400} className="w-100" src={slide2} alt="" />
            <img height={400} className="w-100" src={slide3} alt="" />
          </Slider>

        </div>
        <div className="col-md-3 " >
            <img height={200} className='w-100' src={blog1} alt="" />
            <img height={200} src={blog2} className='w-100' alt="" />
        </div>
      </div>

    </>
  );
}
