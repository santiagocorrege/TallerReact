import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import api from "../scripts/LlamadasFetch";
import moment from "moment";

const Informe = () => {
  const eventos = useSelector((state) => state.infoSlice.eventos);
  const [timers, setTimers] = useState({
    biberon: moment.duration(0),
    panal: moment.duration(0),
  });
  const [cantidad, setCantidad] = useState({biberon: 0, panal: 0})

  useEffect(() => {
    if (eventos === undefined) {
      const fetchEventos = async () => {
        const data = await api.fetchListarEventos();
        if (data.codigo === 200) {
          formatearEventos(data.eventos);
        }
      };
      fetchEventos();
    }
  }, [eventos]);

  useEffect(() => {
    const updateTimers = () => {
      setTimers((prevTimers) => ({
        biberon: moment.duration(prevTimers.biberon.asMilliseconds() + 1000),
        panal: moment.duration(prevTimers.panal.asMilliseconds() + 1000),
      }));
    };
    const intervalId = setInterval(updateTimers, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const esHoy = (fecha) => moment(fecha).isSame(moment(), "day");

  const mayorFecha = (fecha1, fecha2) =>
    moment.max(moment(fecha1), moment(fecha2));

  const formatearEventos = (arr) => {
    if (arr && arr.length > 0) {
      const filtro = arr.reduce(
        (acc, e) => {
          if (e.idCategoria === 33) {
            if (esHoy(e.fecha)) {
              acc.panales.eventos += 1;
            }
            acc.panales.ultimo = mayorFecha(acc.panales.ultimo, e.fecha);
          } else if (e.idCategoria === 35) {
            if (esHoy(e.fecha)) {
              acc.biberones.eventos += 1;
            }
            acc.biberones.ultimo = mayorFecha(acc.biberones.ultimo, e.fecha);
          }
          return acc;
        },
        {
          biberones: { eventos: 0, ultimo: new Date(0)},
          panales: { eventos: 0, ultimo: new Date(0)},
        }
      );      
      if (
        filtro.biberones.eventos !== 0 ||
        filtro.biberones.ultimo !== new Date(0)
      ) {        
        let fechaActual = moment();
        let ultimoEvento = moment(filtro.biberones.ultimo);
        let duracion = moment.duration(fechaActual.diff(ultimoEvento));

        setTimers((timers) => ({
          ...timers,
          biberon: duracion,
        }));
        setCantidad((prev) => ({ ...prev, biberon: filtro.biberones.eventos }));
      }

      if (
        filtro.panales.eventos !== 0 ||
        filtro.panales.ultimo !== new Date(0)
      ) {
        let fechaActual = moment();
        let ultimoEvento = moment(filtro.panales.ultimo);
        let duracion = moment.duration(fechaActual.diff(ultimoEvento));

        setTimers((timers) => ({
          ...timers,
          panal: duracion,
        }));
        setCantidad((prev) => ({ ...prev, panal: filtro.panales.eventos }));
        console.log("FILTRO", filtro);
      }
      console.log(cantidad);
    }
  };

  const formateoDuracion = (duration) => {
    const horas = Math.floor(duration.asHours());
    const minutos = duration.minutes();
    const segundos = duration.seconds();

    return { horas, minutos, segundos };
  };

  const biberonDuracion = formateoDuracion(timers.biberon);
  const panalDuracion = formateoDuracion(timers.panal);

  return (
    <>
      <div className="row justify-content-center align-items-center m-3">
        <h2 className="col-12 text-center pb-2">Informe Dia</h2>
        <h3 className="col-10 text-center pb-2 text-bg-primary">
          Ultimo cambio
        </h3>
        <div className="col-10 text-center">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan="3">Biberones</th>
              </tr>
              <tr>
                <th>Horas</th>
                <th>Minutos</th>
                <th>Segundos</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                {cantidad.biberon !== 0 ? (
                  <>
                    <td>{biberonDuracion.horas}</td>
                    <td>{biberonDuracion.minutos}</td>
                    <td>{biberonDuracion.segundos}</td>
                  </>
                ) : (
                  <td colSpan="3" className="text-center">
                    No hay biberones registrados
                  </td>
                )}
              </tr>
              <tr>
                <th colSpan="3">Pañales</th>
              </tr>
              <tr>
                <th>Horas</th>
                <th>Minutos</th>
                <th>Segundos</th>
              </tr>
              <tr>
                {cantidad.panal !== 0 ? (
                  <>
                    <td>{panalDuracion.horas}</td>
                    <td>{panalDuracion.minutos}</td>
                    <td>{panalDuracion.segundos}</td>
                  </>
                ) : (
                  <td colSpan="3" className="text-center">
                    No hay panales registrados
                  </td>
                )}
              </tr>
            </tbody>
          </Table>
        </div>
        <h3 className="text-bg-primary col-10 text-center">Hoy</h3>
        <h6 className="text-start col-10">
          Cantidad Biberones{" "}
          <span className="badge text-bg-secondary">{cantidad.biberon}</span>
        </h6>
        <h6 className="text-start col-10">
          Cantidad Panales{" "}
          <span className="badge text-bg-secondary">{cantidad.panal}</span>
        </h6>
      </div>
    </>
  );
};

export default Informe;
