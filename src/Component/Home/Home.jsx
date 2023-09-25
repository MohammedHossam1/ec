import React, { useContext } from 'react'
import { CounterContext } from '../../Context/context'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
export default function Home() {
  let {changeCounter}=useContext(CounterContext)
  return <>
  <FeaturedProducts/>
  {/* <button onClick={()=>changeCounter()} className='btn btn-danger'>counter in home</button> */}
  </>
}
