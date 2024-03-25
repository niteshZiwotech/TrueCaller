import React from "react";


//Pages
import Home from "../Pages/Home";
import SignIn from "../Pages/Login";
import VerifyOtp from "../Pages/VerifyOtp";
import MainWrapper from "../MainWrapper";


const publicRoutes = [
  { path: "/", element: <MainWrapper><Home /></MainWrapper>},
  { path: "/login", element: <MainWrapper><SignIn /></MainWrapper>},
  { path: "/verifyOTP", element:<MainWrapper><VerifyOtp /></MainWrapper>},
];

export { publicRoutes };
