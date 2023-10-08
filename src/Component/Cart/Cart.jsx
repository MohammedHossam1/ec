import React, { useContext, useEffect, useState } from "react";
import { CartConext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  let [cartDetails, setCartDetails] = useState(null);
  let { getCart,DeleteCartItem,updateCartItem} = useContext(CartConext);
  async function DeleteItem(id) {
    let { data } = await DeleteCartItem(id);
  //  console.log(data);
    setCartDetails(data);
  }
  async function updateItem(id,count) {
    let { data } = await updateCartItem(id,count);
    setCartDetails(data);
  }
  async function getCarts() {
    let { data } = await getCart();
    setCartDetails(data);
  }
  useEffect(() => {
    getCarts();
  }, []);

  return (
    <>
      {cartDetails ? (
        <div className=" container bg-main-light p-3 my-3">
        <div className="d-flex justify-content-between align-items-center border-bottom py-2"> 
        
          <h3>Shopping Cart</h3>
        <Link to='/address' className='btn mt-3 bg-main text-white'> Check out</Link>
          
          </div>
          <h4 className="h6 text-main mt-2 ">
            Cart items: {cartDetails.numOfCartItems}
          </h4>
          <h4 className="h6 text-main ">
            Total price: {cartDetails.data.totalCartPrice}
          </h4>
          {cartDetails.data.products.map((product) => (
            <div key={product.product.id} className="row py-2 border-bottom">
              <div className="col-md-2">
                <img
                  className="w-100 m-2 border border-2"
                  src={product.product.imageCover}
                  alt=""
                />
              </div>
              <div className="col-md-10 mt-3">
                <div className="d-flex justify-content-between align-items-center ">
                  <div className="">
                    <h3 className="text-main h6">
                       {product.product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <h6 className="text-main">Price : {product.price}EGP</h6>
                  </div>
                  <div className="">
                    <button onClick={()=>updateItem(product.product.id,product.count+1)} className="btn bg-main text-white p-1">+</button>
                    <span> {product.count} </span>
                    <button onClick={()=>updateItem(product.product.id,product.count-1)} className="btn  bg-main text-white px-1">-</button>
                  </div>
                </div>
                <button onClick={()=>DeleteItem(product.product.id)} className="btn p-0  ">
                  <i className="fas fa-trash-can text-danger"></i> Remove
                </button>
              </div>
              {/* col-11 */}
            </div>
          ))}
        </div>
      ) : (
        <div  className="bg-white w-100 vh-100 fa-3x d-flex justify-content-center align-items-center">
          Loading <i className="loader fa-3x mx-2 "></i>
        </div>
      )}
    </>
  );
}
