import React from 'react'

import NavBar from "../components/Comun/NavBar";
import Informe from "./Informe";
import AgregarEvento from "./AgregarEvento";
import ListadoEventos from "./ListadoEventos";

import { setEventos, setCategorias } from "../redux/features/infoSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import api from "../scripts/LlamadasFetch";
import Consumo from './Consumo';
import Ingesta from './Ingesta';


const Dashboard = () => {
    const eventos = useSelector((state) => state.infoSlice.eventos);
    const categorias = useSelector((state) => state.infoSlice.categorias);    

    const dispatch = useDispatch();

    useEffect(() => {
      if (categorias.length === 0) {
        const categoriasSetter = async () => {
          const data = await api.fetchCategorias();
          if (data !== undefined) {
            dispatch(setCategorias(data));
          }
        };
        categoriasSetter();
      }
    }, []);

    useEffect(() => {
      if (eventos === undefined) {
        const fetchEventos = async () => {
          const data = await api.fetchListarEventos();
          if (data.codigo === 200) {
            dispatch(setEventos(data.eventos));
          }
        };
        fetchEventos();
      }
    }, [eventos]);

  return (
    <BrowserRouter>
      <main className={`container-fluid g-0 maincontainer`}>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<ListadoEventos />}></Route>
          <Route path="/eventos/agregar" element={<AgregarEvento />}></Route>
          <Route path="/eventos/listar" element={<ListadoEventos />}></Route>
          <Route path="/informe" element={<Informe />}></Route>
          <Route path="/analisis" element={<Consumo />}></Route>
          <Route path="/ingesta" element={<Ingesta />}></Route>
          <Route path="*" element={<p>Url no valida</p>}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default Dashboard
