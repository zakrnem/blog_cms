import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../error-page";

function Root() {
  return (
    <>
      <h2>Hey world</h2>
      <Outlet />
    </>
  );
}

export default Root;
