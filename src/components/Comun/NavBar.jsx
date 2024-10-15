import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import { logout } from "../../redux/features/infoSlice";

const NavBar = () => {
  const dispatch = useDispatch();

  const cerrarSession = () => {
    console.log('asd')
    dispatch(logout());
  }

  return (
    <header className="row justify-content-center align-items-center text-start g-0 m-0 nav-header">
      <h1 className="col-2 m-auto ps-4" style={{ fontSize: "3.5rem" }}>
        <span>Baby</span>Tracker
      </h1>
      <nav className="col-lg-8  text-start m-auto">
        {" "}
        {/*col-lg-8 col-md-8 col-sm-12*/}
        <ul className="list-inline m-0 p-0 ps-3">
          <li className="list-inline-item p-0">
            <a href="/eventos/listar" className="text-decoration-none">
              Eventos
            </a>
          </li>
          <li className="list-inline-item p-0">
            <a href="/eventos/agregar" className="text-decoration-none">
              Agregar Evento
            </a>
          </li>
          <li className="list-inline-item p-0">
            <a href="/informe" className="text-decoration-none">
              Informe
            </a>
          </li>
          <li className="list-inline-item p-0">
            <a href="/analisis" className="text-decoration-none">
              Analisis
            </a>
          </li>
          <li className="list-inline-item p-0">
            <a href="/ingesta" className="text-decoration-none">
              Ingesta
            </a>
          </li>
        </ul>
      </nav>

      <div className="col-2 m-auto p-0">
        <Dropdown>
          <Dropdown.Toggle variant="basic">
            Usuario: {localStorage.getItem("userId")}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/" onClick={cerrarSession}>
              Cerrar Session
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}

export default NavBar
