import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  let [isLoading,setIsLoading]=useState(false);
  let emailInput = useRef();
  let passInput = useRef();
  let [datat,setDatat]=useState(null)
let navigate=useNavigate() 
function newPassFun(){
  newPass(emailInput.current.value,passInput.current.value)


}

    async function newPass(email,pass) {
      try{
        setIsLoading(true)
        let {data}= await axios.put(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        email:email,
        newPassword:pass
    }
    
  

    )
    setIsLoading(false)
    setDatat(data)
  navigate('/login')
  }
  catch(err){
    setIsLoading(false)

  }
}


  return (
    <div className='container my-5'>
      <>
  <h4 className='text-main' htmlFor="email">Enter Your Email and set the new password</h4>
  <label htmlFor="email">Email</label>
<input ref={emailInput} name="email" type="text" className="form-control my-1" />

  <label htmlFor="newPassword">password</label>
<input ref={passInput} name="newPassword" type="text" className="form-control my-1" />
{isLoading?<button className='btn text-white bg-main'>
      <i className='fa-solid fa-spinner fa-spin'></i>
    </button>:
<button  className='btn mt-2 bg-main text-white' onClick={newPassFun}>change</button>}
</>
    </div>
  )
}
