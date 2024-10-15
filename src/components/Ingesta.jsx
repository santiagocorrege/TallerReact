import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const Ingesta = () => {
  const eventos = useSelector((state) => state.infoSlice.eventos);
  const [tiempoRestante, setTiempoRestante] = useState(null);

  const mayorFecha = (fecha1, fecha2) => {
    return moment.max(moment(fecha1), moment(fecha2)).toDate();
  };

  useEffect(() => {
    
    if (eventos && eventos.length > 0) {
      const filtrados = eventos.filter(e => e.idCategoria === 35);
      if(filtrados && filtrados.length > 0){
          const ultimaFecha = filtrados.reduce(
            (acc, e) => mayorFecha(acc, e.fecha),
            new Date(0)
          );
          const proximaIngesta = moment(ultimaFecha).add(4, "hours");
          const ahora = moment();
          const diferencia = moment.duration(proximaIngesta.diff(ahora));

          const horas = Math.floor(diferencia.asHours());
          const minutos = diferencia.minutes();
          const segundos = diferencia.seconds();

          setTiempoRestante({ horas, minutos, segundos });
      }
    }
  }, [eventos]);

  const calcularClase = () => {
    if (tiempoRestante) {
      const { horas } = tiempoRestante;

      if (horas < 0) {
        return "text-danger"; 
      } else {
        return "text-success"; 
      }
    }
    return "";
  };

  return (
    <div className="row justify-content-center align-items-center m-3 text-center">
      <h2 className="col-10">Próxima Ingesta Biberon</h2>
      <div className="col-10">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tiempo Restante</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td className={calcularClase()}>
                {tiempoRestante
                  ? `${tiempoRestante.horas}h ${tiempoRestante.minutos}m ${tiempoRestante.segundos}s`
                  : "No hay eventos registrados"}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Ingesta;
