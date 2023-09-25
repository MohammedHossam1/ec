import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import { userContext } from "../Context/UserContext";
export default function Layout() {
  //will bring the user token from Local srtorage here to be the first thing app do
  let { setUserToken } = useContext(userContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      let theToken = localStorage.getItem("userToken");
      setUserToken(theToken)
    }
  },[]);
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
