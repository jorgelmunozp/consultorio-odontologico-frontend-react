import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
// import { Navbar } from "../components/menu/Navbar"
import { HomeScreen } from "../components/views/home/HomeScreen";

import { useFetch } from "../hooks/useFetch";

export const DashboardRoutes = () => {

  const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND;

  const urlApiInmuebles = process.env.REACT_APP_API_INMUEBLES;
  const inmuebles = useFetch(urlApiInmuebles).data;

  return (
    <div className="container user-select-none">
      <Routes>
          <Route path={urlBaseFrontend + "/home" + urlBaseFrontend} element={<HomeScreen inmuebles={inmuebles} />} />
          <Route path={"/" + urlBaseFrontend} element={<HomeScreen inmuebles={inmuebles} />} />
      </Routes>
    </div>
  )
}
