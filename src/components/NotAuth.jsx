import React from 'react'
import Login from "../components/Login";
import Registro from "../components/Registro";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const NotAuth = () => {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registro" element={<Registro />}></Route>
        <Route path="*" element={<p>NO SE HALLÓ</p>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default NotAuth
