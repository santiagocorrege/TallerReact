import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";

const ConsumoSemanal = () => {
  const eventos = useSelector((state) => state.infoSlice.eventos);
  const categorias = useSelector((state) => state.infoSlice.categorias);
  const [datos, setDatos] = useState({});

  useEffect(() => {
    if (eventos !== undefined && categorias.length > 0) {      
      filtro();
    }
  }, [eventos]);

  const filtro = () => {    
    const final = moment().endOf("week").add(1, "day"); 
    const inicio = moment().startOf("week").add(1, "day");    

    const filtrar = eventos.reduce((acc, a) => {
      const fechaEvento = moment(a.fecha);
      if (fechaEvento.isBetween(inicio, final, null, "[]") && a.idCategoria === 31) {
        const diaDeLaSemana = fechaEvento.format("dddd");
        console.log("dia", diaDeLaSemana);
        acc[diaDeLaSemana] = acc[diaDeLaSemana] + 1;
      }
      return acc;
    }, {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0
    }); 
    setDatos(filtrar);  
  };

  const diasNombres = Object.keys(datos);
  const diasValores = Object.values(datos);

  const options = {
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    xaxis: {
      categories: diasNombres,
    },
  };

  const series = [
    {
      name: "Cantidad de comidas",
      data: diasValores || [],
    },
  ];

  return (
    <div
      id="chart"
      className="row align-items-center justify-content-center pt-3"
    >
      <h2 className="text-center col-12">Consumo Semanal Comidas</h2>
      <div className="col-8 pt-5 pb-3">
        <Chart options={options} series={series} type="bar" height={350} />
      </div>
    </div>
  );
};

export default ConsumoSemanal;
