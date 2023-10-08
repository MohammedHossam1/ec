import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function VerifyPassword() {
  let codeInput = useRef();
  let [code,setCode]=useState(null);
  let [err,setErr]=useState(null);
  let [isLoading,setIsLoading]=useState(false);
let navigate=useNavigate();
  function sendCodeNum(){
    sendCode(codeInput.current.value)
    // if(code?.status=='Success'){
      // console.log('suc');
  //  }//end if 
  }
      async function sendCode(codeInput) {
      try{
        setIsLoading(true)
      let {data}= await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", { resetCode:codeInput,}
      )

      // console.log(data);
      setCode(data)
      setIsLoading(false)
      navigate('/resetpassword')

     
    }//end try
  
  catch(error){
setErr(error)
setIsLoading(false)

    }//end catch

  }//end send
  return (
    


   <div className='container my-5'>
   {err!=null?
    <div className="alert alert-danger">Code is invalid</div>: ''}
    <h4 className="alert m-0 text-main">Reset code sent to your email</h4>
    <input placeholder='Verify code..' ref={codeInput} name="forget" type="text" className="form-control my-3" />
    {isLoading?<button className='btn text-white bg-main'>
      <i className='fa-solid fa-spinner fa-spin'></i>
    </button>:<button  className='btn bg-main text-white' onClick={()=>sendCodeNum()}>submit</button>}
    </div>
 
 
 )
}

{/* if the input is not exist in db
  :
  err!=null? <>
  <div className="alert alert-danger">{err}</div>
  <label htmlFor="forget">Enter your email</label>
<input ref={emailInput} name="forget" type="text" className="form-control my-3" />
<button  className='btn bg-main text-white' onClick={sub}>change</button>
</>

  :
  //if he whrie correct code
  code!=null?  */}










