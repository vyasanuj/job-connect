// import React, { useEffect } from "react";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import { Outlet } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useDispatch } from "react-redux";
// import { getUser } from "./store/slices/userSlice";

// function Layout() {
  
//   const dispatch = useDispatch();

//   useEffect(()=>{
//     dispatch(getUser);
//   },[])
  
//   return (
//     <>
//       <Header />
//       <Outlet />
//       <Footer />
//       <ToastContainer position="top-right" theme="dark" />
//     </>
//   );
// }

// export default Layout;

import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/userSlice";

function Layout() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user information on app load
    if (!isAuthenticated) {
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer position="top-right" theme="dark" />
    </>
  );
}

export default Layout;
