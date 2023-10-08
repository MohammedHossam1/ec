import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import { userContext } from "../Context/UserContext";
// import {Offline} from 'react-detect-offline'
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
  //will bring the user token from Local srtorage here to be the first thing app do
  let { setUserToken } = useContext(userContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      let theToken = localStorage.getItem("userToken");
      setUserToken(theToken);
    }
  }, []);
  return (
    <>
      <NavBar />
      <Outlet />
      {/* <Offline>
    
  </Offline>  */}
      <div className="text-dark">
        <Offline>
          <div className="rounded-2 p-3 position-fixed bottom-0 left-0  m-5 bg-danger text-white shadow">
            <i className="fa-solid fa-wifi mx-2"></i>
            You are offline
          </div>
        </Offline>
      </div>
      <Footer />
    </>
  );
}
