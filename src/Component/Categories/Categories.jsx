import axios from "axios";
import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { CategoryContext } from "../../Context/CategoryContext";

export default function Categories() {
  let { catProduct } = useContext(CategoryContext);
  // console.log(catProduct?.data.length);

  return (
    <div>
      <div className="container my-5">
          {catProduct?.data.length>0? (
          <>
            <h1 className="my-4 py-1 fw-bold text-main f-5x text-center border shadow">
              {catProduct?.data[0].category.name}
              </h1>
              <div className="row g-3">
              {catProduct?.data.map((cat) => (
                <div className="col-md-2" id={cat.id}>
                  <div className="rounded-2 bg-white h-100 p-1 shadow-sm ">
                  <img src={cat.imageCover} className="w-100" alt="" />
                  <div className="p-2">
                  <h2 className="h5 text-main">
                    {cat.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  <h2 className="h6 ">
                    {cat.description.split(" ").slice(0, 5).join(" ")}
                  </h2>
                  </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div>yse</div> */}
          </>
        ) : (
          <div className="alert alert-danger ">There is no data for this field for now</div>
        )}
      </div>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Categories</title>
      </Helmet>
    </div>
  );
}
