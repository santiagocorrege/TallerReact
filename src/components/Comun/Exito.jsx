import React from "react";
import { Alert } from "@mui/material";

const Exito = ({ mensaje }) => {
  return (
    <>
      {mensaje ? (
        <Alert variant="success" sx={{ mt: 0, mb: 1 }}>
          {mensaje}
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
};

export default Exito;
