import React, { useState } from 'react';
 
export default function Login() {
  const [valores, setValores] = useState({});
  const handleChange = (e) => {
    setValores((valoresActuales) => {
      console.log(`valoresActuales`, valoresActuales);
      console.log(`e.target.name`, e.target.name);
      return {
        ...valoresActuales,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
    });
  };
  return (
    <div>
      <input
        name="nombre"
        value={valores.nombre ?? ""}
        placeholder="Ingrese nombre"
        onChange={handleChange}
      />
      <input
        type="checkbox"
        name="tik"
        checked={valores.tik ?? ""}
        onChange={handleChange}
      />
    </div>
  );
}
