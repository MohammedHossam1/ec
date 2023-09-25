import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Oval } from "react-loader-spinner";

let validateSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Must be more than 3 characters")
    .max(20, "Must be less than 20 characters"),
  email: yup
    .string()
    .required("email is required")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter valid email"),
  password: yup
    .string()
    .required("passwprd is required")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Enater valid password"),
  rePassword: yup
    .string()
    .required("rePassword is required")
    .oneOf([yup.ref("password")]),
  phone: yup
    .string()
    .required("phone is required")
    .matches(/^01[0125][0-9]{8}$/, "Enter valid Egyption number "),
});
export default function Register() {
  let [isLoading, setIsLoading] = useState(false);
  let [err, setErr] = useState(false);

  let navigate = useNavigate();
  async function register(values) {
    setIsLoading(true);
    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setIsLoading(false);
        setErr(err.response.data.message);
      });
    if (data.message == "success") {
// console.log(data);     
      navigate("/login");
      setIsLoading(false);
    }
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validateSchema,
    onSubmit: register,
  });
  return (
    <>
      <div className="my-5">
        <div className="w-75 m-auto">
          {err ? <div className="alert alert-danger">{err}</div> : null}
          <h1 className="my-3">Register now : </h1>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name : </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text mb-2"
              className="form-control"
              name="name"
              id="name"
            />
            {formik.errors.name && formik.touched.name ? (
              <p className="alert my-2 alert-danger">{formik.errors.name}</p>
            ) : null}

            <label htmlFor="email">Email : </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email mb-5"
              className="form-control"
              name="email"
              id="email"
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="alert my-2 alert-danger">{formik.errors.email}</p>
            ) : null}

            <label htmlFor="password">Password : </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password mb-5"
              className="form-control"
              name="password"
              id="password"
            />
            {formik.errors.password && formik.touched.password ? (
              <p className="alert my-2 alert-danger">
                {formik.errors.password}
              </p>
            ) : null}

            <label htmlFor="rePassword">rePassword : </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password mb-5"
              className="form-control"
              name="rePassword"
              id="rePassword"
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <p className="alert my-2 alert-danger">
                {formik.errors.rePassword}
              </p>
            ) : null}

            <label htmlFor="phone">phone : </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="tel mb-2"
              className="form-control"
              name="phone"
              id="phone"
            />
            {formik.errors.phone && formik.touched.phone ? (
              <p className="alert my-2 alert-danger">{formik.errors.phone}</p>
            ) : null}

            {isLoading ? (
              <button
                type="button"
                className="btn text-white bg-main mt-3 ms-auto d-block"
              >
                <Oval
                  height={20}
                  width={80}
                  color="white"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="gray"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!(formik.dirty && formik.isValid)}
                className="btn text-white bg-main mt-3 ms-auto d-block"
              >
                Register
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
