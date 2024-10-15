import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modificarEvento } from "../redux/features/infoSlice";
import Table from "react-bootstrap/Table";
import api from "../scripts/LlamadasFetch";
import Exito from "./Comun/Exito";  

function ListadoEventos() {
  const dispatch = useDispatch();
  const eventos = useSelector((state) => state.infoSlice.eventos);  
  const categorias = useSelector((state) => state.infoSlice.categorias);
  const [mensaje, setMensaje] = useState("");
  const [filtrados, setFiltrados] = useState(null);


   useEffect(() => {
     if (eventos && eventos.length > 0) {
       const arr = eventos.filter((e) => esHoy(e.fecha));
       setFiltrados({datos: arr, filtrado: "hoy"});
       console.log("Filtrados", arr);
     }
   }, [eventos]);

   
  const esHoy = (fecha) => {    
    const fechaEntrada = new Date(fecha);    
    const hoy = new Date();    
    return (
      fechaEntrada.getFullYear() === hoy.getFullYear() &&
      fechaEntrada.getMonth() === hoy.getMonth() &&
      fechaEntrada.getDate() === hoy.getDate()
    );
  };

  const filtrar = (tipo) => {
    if(tipo === "hoy"){
      const arr = eventos.filter((e) => esHoy(e.fecha));
      setFiltrados({ datos: arr, filtrado: "hoy" });
    }else{
      const arr = eventos.filter((e) => !esHoy(e.fecha));
      setFiltrados({ datos: arr, filtrado: "anteriores" });
    }
  }

  const eliminarEvento = (id) => {
    const eliminarEvento = async () => {
      const data = await api.fetchEliminarEvento(id);      
      if (data.codigo === 200) {
        setMensaje("Evento Eliminado");
        dispatch(modificarEvento({ operacion: "eliminar", id: id }));
      } else {
        setMensaje("Error en el sistema");
      }
    };
    eliminarEvento();
  };

  const devolverIdImagen = (id) => {
    if(categorias && categorias.length > 0){
      const categoria = categorias.find(c => c.id === id)
      return categoria.imagen;
    }else{
      return 1;
    }
  }

  return (
    <>      
      <div className="row justify-content-center align-items-center py-5">
        <h3 className="col-12 text-center pb-2">
          {filtrados && filtrados.filtrado === "hoy"
            ? "Eventos hoy"
            : "Eventos anteriores"}
        </h3>
        <div className="col-10 text-center">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Id</th>
                <th>Categoria</th>
                <th>Detalle</th>
                <th>Fecha</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {
              filtrados && filtrados.datos.length > 0 ? (
                filtrados.datos.map((e) => {
                  return (
                    <tr
                      key={e.id}
                      className="justify-content-center align-items-center"
                    >
                      <td>
                        
                        <img
                          src={`https://babytracker.develotion.com/imgs/${devolverIdImagen(
                            e.idCategoria
                          )}.png`}
                          alt={e.idCategoria}
                          className="img-fluid p-0 m-0"
                        />
                      </td>
                      <td>{e.id}</td>
                      <td>{e.idCategoria}</td>
                      <td>{e.detalle}</td>
                      <td>{e.fecha}</td>
                      <td>
                        <input
                          type="button"
                          onClick={() => {
                            eliminarEvento(e.id);
                          }}
                          value="X"                          
                          style={{ width: "50%" }}
                          className="btn btn-primary"
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">No hay eventos</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Exito mensaje={mensaje}></Exito>
        </div>
        <div className="text-center mt-3">
          <input
            type="button"
            className="btn btn-primary me-2"
            value="Eventos anteriores"
            onClick={() => {
              filtrar("anteriores");
            }}
          ></input>
          <input
            type="button"
            className="btn btn-primary ms-2"
            value="Eventos de hoy"
            onClick={() => {
              filtrar("hoy");
            }}
          ></input>
        </div>
      </div>
    </>
  );
}

export default ListadoEventos;
