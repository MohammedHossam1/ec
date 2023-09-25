import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Oval } from "react-loader-spinner";
import { userContext } from "../../Context/UserContext";

let validateSchema = yup.object({
  email: yup
    .string()
    .required("email is required")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter valid email"),
  password: yup
    .string()
    .required("passwprd is required")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Enater valid password"),
});
export default function Login() {
  let { setUserToken } = useContext(userContext);
  let [isLoading, setIsLoading] = useState(false);
  let [err, setErr] = useState(false);

  let navigate = useNavigate();
  async function loginSubmit(values) {
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setIsLoading(false);
        setErr(err.response.data.message);
      });
    if (data.message == "success") {
      console.log("suc");
      navigate("/home");
      //set user token in local storage
      localStorage.setItem("userToken", data.token);
      //set user token in context
      setUserToken(data.token);
      setIsLoading(false);
    }
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: loginSubmit,
  });
  return (
    <>
      
      <div className="my-5">
        <div className="w-75 m-auto">
          {err ? <div className="alert alert-danger">{err}</div> : null}
          <h1 className="my-3">Login now : </h1>
          <form onSubmit={formik.handleSubmit}>
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
              <div className="d-flex ms-auto align-items-end">
                <button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                  className="btn text-white bg-main mt-3 ms-auto "
                >
                  Login
                </button>
                <Link to="/register" className="btn  mx-1">
                  Register Now{" "}
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
