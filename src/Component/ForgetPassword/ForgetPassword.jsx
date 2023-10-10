import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  let emailInput = useRef();
  let codeInput = useRef();
  let currentInput = useRef();
  let passInput = useRef();
  let rePassInput = useRef();
  let [mainData,setMainData]=useState(null)
  let [err,setErr]=useState(null)
  let [code,setCode]=useState(null)
 
  function sub() {
    forget(emailInput.current.value);
  }

let navigate=useNavigate()

    async function forget(value) {
    try{
    let {data}= await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        email:value,
    }

    )
    setMainData(data)
    navigate('/verifypassword') 
// console.log(data);
  }
  catch(error){
    setErr(error.response.data.message);
    // console.log(error);

    }
  
}//end




















  return (
    <div className="container my-5">
        <label htmlFor="forget">Enter your email</label>
      <input ref={emailInput} name="forget" type="text" className="form-control my-3" />
      <button  className='btn bg-main text-white' onClick={sub}>sub</button>
    </div>
  );
}
