import axios from "axios";
import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { CategoryContext } from "../../Context/CategoryContext";

export default function Categories() {
  let { catProduct } = useContext(CategoryContext);

  // categoryNavigate()

  console.log(catProduct);

  return (
    <div>
        <div className="container my-5">
          <h1 className="my-4 py-1 fw-bold text-main f-5x text-center border shadow">{catProduct?.data[0].category.name}</h1>
          <div className="row">
      {catProduct?.data.map((cat) => (
            <div className="col-md-2" id={cat.id}>
          <img src={cat.imageCover} className="w-100" alt="" />
             <h2 className="h5 text-main"> {cat.title.split(" ").slice(0, 2).join(" ")}</h2>
             <h2 className="h6 "> {cat.description.split(" ").slice(0, 10).join(" ")}</h2>
            </div>
          ))}
          </div>
        </div>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Categories</title>
      </Helmet>
    </div>
  );
}
