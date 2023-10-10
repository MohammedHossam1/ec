import { Formik, useFormik } from "formik";
import React, { useContext } from "react";
import { CartConext } from "../../Context/CartContext";
export default function Address() {

  let {cartId,payOnline}=useContext(CartConext)
  async function subFun(values) {
    let x=await payOnline(cartId,values)
    // console.log(x.data.session.url);
    
    window.location.href=x.data.session.url
  }
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: subFun,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container">
      <label htmlFor="details">Details</label>
      <input name='details' value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className=" mb-2 form-control"  />
    
      <label htmlFor="phone">Phone</label>
      <input name='phone' value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" className="mb-2 form-control"  />
    
      <label htmlFor="city">City</label>
      <input name='city' value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className="mb-2 form-control" />
    
    
      <button  type="submit" className="btn text-white bg-main">
        Pay
      </button>
      </div>
    </form>
  );
}
