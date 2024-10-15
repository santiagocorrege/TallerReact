import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ConsumoTotal = () => {
  const eventos = useSelector((state) => state.infoSlice.eventos);
  const categorias = useSelector((state) => state.infoSlice.categorias);
  const [datos, setDatos] = useState({});  

  useEffect(() => {
    if (eventos !== undefined && categorias.length > 0) {
      console.log(eventos, categorias);
      filtro();
    }
  }, [eventos]);

  const filtro = () => {
    const conteos = categorias.reduce((acc, c) => {
      acc[c.tipo] = 0;
      return acc;
    }, {});

    eventos.forEach((e) => {
      const categoria = categorias.find((c) => c.id === e.idCategoria).tipo;
      conteos[categoria] = conteos[categoria] ? conteos[categoria] + 1 : 1;
    });

    const categoriasNombres = Object.keys(conteos);
    const eventosContados = Object.values(conteos);

    setDatos({
      categorias: categoriasNombres,
      series: eventosContados,
    });
  };

  const options = {
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    xaxis: {
      categories: datos.categorias || [],
    },
  };

  const series = [
    {
      name: "Cantidad de eventos",
      data: datos.series || [],
    },
  ];

  return (
    <div
      id="chart"
      className="row align-items-center justify-content-center pt-3"
    >
      <h2 className="text-center col-12">Consumo total</h2>
      <div className="col-8 pt-5">
        <Chart options={options} series={series} type="bar" height={350} />
      </div>
    </div>
  );
};

export default ConsumoTotal;
