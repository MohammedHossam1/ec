import React from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategoreySliders from "../CategorySliders/CategoreySliders";
import MainSlider from "../MainSlider/MainSlider";
import {Helmet} from "react-helmet";

export default function Home() {
  return (
    <>
      <div className="container">
      <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Home</title>
            </Helmet>
        <MainSlider />
        <CategoreySliders />
        <FeaturedProducts />
      </div>
    </>
  );
}
