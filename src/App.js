import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/features/infoSlice";
import Dashboard from "./components/Dashboard";
import NotAuth from "./components/NotAuth";

const App = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.infoSlice.usuario);
  const user = localStorage.getItem("userId");

  useEffect(() => {
    if (user && !usuario) {
      dispatch(login());
    }
  }, [user, usuario, dispatch]);

  return usuario ? <Dashboard /> : <NotAuth />;
};

export default App;
