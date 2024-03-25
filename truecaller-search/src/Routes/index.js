import React from "react";
import { publicRoutes } from "./routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Index = () => {
  const publicRouter = createBrowserRouter(publicRoutes)
  return (
    <>
      <RouterProvider router={publicRouter} />
    </>
  );
};

export default Index;
