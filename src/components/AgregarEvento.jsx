import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Dropdown } from "react-bootstrap";
import { modificarEvento } from "../redux/features/infoSlice";
import Error from './Comun/Error';
import Exito from "./Comun/Exito";
import api from "../scripts/LlamadasFetch";
import moment from "moment";

const AgregarEvento = () => {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.infoSlice.categorias);
  const [formData, setFormData] = useState({
    fecha: "",
    detalle: "",
    idCategoria: 0,
  });

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  useEffect(() => {
    setError("");
    setFormData({
      fecha: "",
      detalle: "",
      idCategoria: 0,
    });
    setExito("");
    if (categorias.length === 0) {
      setError("Error en el servidor");        
    }
  }, [categorias.length, dispatch]);

  const handleChange = (e) => {
    setFormData((valoresActuales) => {
      return {
        ...valoresActuales,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
    });
  };

  const handleDropdownSelect = (eventKey) => {
    setFormData((valoresActuales) => ({
      ...valoresActuales,
      idCategoria: parseInt(eventKey, 10), 
    }));
  };

  const handleSubmit = (e) => {
    setExito("");
    e.preventDefault();
    if(formData.fecha === "" || formData.idCategoria === 0 || formData.detalle === ""){
      setError("Llene todos los campos");    
    } else {
      setError("");
      const agregar = async () => {
        const data = await api.fetchAgregarEvento(formData);
        if (data.codigo === 200) {
          setExito("Evento agregado");
          dispatch(modificarEvento({ operacion: "agregar", formData }));
          setFormData({
            fecha: "",
            detalle: "",
            idCategoria: 0,
          });
        } else {
          setError("Error en el servidor");
        }
      };
      agregar();
    }
    console.log(formData);
  };

  return (
    <>      
      <div className="row align-items-center justify-content-center pt-3">
        <Form className="col-6 sectionC" onSubmit={handleSubmit}>
          <h2 className="text-center">Agregar Evento</h2>
          <Form.Group className="mb-3">
            <Form.Label>Categoria</Form.Label>
            <Dropdown onSelect={handleDropdownSelect}>
              <Dropdown.Toggle variant="primary">
                {categorias.find((c) => c.id === formData.idCategoria)?.tipo ||
                  "Seleccione una categoria"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categorias.length > 0
                  ? categorias.map((c) => (
                      <Dropdown.Item eventKey={c.id} key={c.id}>
                        {c.tipo}
                      </Dropdown.Item>
                    ))
                  : null}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="datetime-local"
              name="fecha"
              onChange={handleChange}
              value={formData.fecha}
              max={moment().format("YYYY-MM-DDTHH:mm")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              name="detalle"
              onChange={handleChange}
              value={formData.detalle}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mx-auto">
            Agregar
          </Button>
          <Error errorRegistro={error}></Error>
          <Exito mensaje={exito}></Exito>
        </Form>
      </div>
    </>
  );
};

export default AgregarEvento;
