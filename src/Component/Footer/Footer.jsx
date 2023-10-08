import React from 'react'

export default function Footer() {
  return (
    <div className='bg-light p-5 foter'>
      <h2>Get the FreshCart app</h2>
      <h3 className='lead p-2'>We will send you alink ,open it on your phone to download the app</h3>
      <div className="p-1  d-flex">
      <input placeholder='Email...' className='form-control mx-2'   type="text" name="" id="" />
      <button className='btn bg-main text-white'>Share App Link</button>
      </div>
    </div>
  )
}
