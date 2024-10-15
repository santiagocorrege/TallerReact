const baseUrl = 'https://babytracker.develotion.com';

const fetchDepartamentos = async () =>{
  const url = `${baseUrl}/departamentos.php`
  const data = await fetch(url)
    .then((response) => response.json())
    .then((data) => {        
      if(data.codigo === 200 && data.departamentos.length > 0){
        return data.departamentos;                                      
      }else{
        return [];
      }        
    })      
    .catch((error) => {
      console.log('Error fetching departamentos:', error);
      return [];
    });
    return data;       
}

const fetchCiudades = async idDepartamento => {
  const url = `${baseUrl}/ciudades.php?idDepartamento=${idDepartamento}`
  const data = await fetch(url)
    .then((response) => response.json())
    .then((data) => {         
      if(data.codigo === 200 && data.ciudades.length > 0){
        return data.ciudades;                                      
      }else{
        return [];
      }        
    })      
    .catch((error) => {
      console.error('Error fetching ciudades:', error);
      return [];
    });
    return data;      
}

const fetchRegistro = async (usuario, password, idDepartamento, idCiudad) => {
  const url = `${baseUrl}/usuarios.php`
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({usuario, password, idDepartamento, idCiudad}),
    };
  const data = await fetch(url, options)
    .then((response) => response.json())    
    .catch((error) => {
      console.error('Error fetching registro:', error);
    });
    return data;      
}

const fetchLogin = async (usuario, password) => {
  const url = `${baseUrl}/login.php`
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({usuario, password}),
    };
    const data = await fetch(url, options)
    .then(response => response.json())    
    .catch((error) => {
      console.error('Error fetching login:', error);
    });
    return data;
}

const fetchCategorias = async () => {
  const userId = localStorage.getItem("userId");
  const apiKey = localStorage.getItem("apiKey");

  if (!userId || !apiKey) {
    console.error("userId or apiKey is missing in localStorage");
    return;
  }
  const url = `${baseUrl}/categorias.php`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey,
      iduser: userId,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("problema en el servidor " + response.statusText);
    }
    const data = await response.json();
    return data.categorias;
  } catch (error) {
    console.error("Error fetching categorias:", error);
  }
};


const fetchAgregarEvento = async (evento) => {
  const userId = localStorage.getItem("userId");
  const apiKey = localStorage.getItem("apiKey");

  if (!userId || !apiKey) {
    console.error("userId or apiKey is missing in localStorage");
    return;
  }
  const url = `${baseUrl}/eventos.php`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey,
      iduser: userId,
    },
    body: JSON.stringify({ ...evento , "idUsuario": userId}),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("problema en el servidor " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categorias:", error);
  }
};

const fetchListarEventos = async () => {
  const userId = localStorage.getItem("userId");
  const apiKey = localStorage.getItem("apiKey");

  if (!userId || !apiKey) {
    console.error("userId or apiKey is missing in localStorage");
    return;
  }
  const url = `${baseUrl}/eventos.php?idUsuario=${userId}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey,
      iduser: userId,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("problema en el servidor " + response.statusText);
    }
    const data = await response.json();    
    return data;
  } catch (error) {
    console.error("Error fetching eventos:", error);
  }
};

const fetchEliminarEvento = async (id) => {
  const userId = localStorage.getItem("userId");
  const apiKey = localStorage.getItem("apiKey");

  if (!userId || !apiKey) {
    console.error("userId or apiKey is missing in localStorage");
    return;
  }
  const url = `${baseUrl}/eventos.php?idEvento=${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey,
      iduser: userId,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("problema en el servidor " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching eventos:", error);
  }
};

const api = {fetchCiudades, fetchDepartamentos, fetchRegistro, fetchLogin, fetchCategorias, fetchAgregarEvento, fetchListarEventos, fetchEliminarEvento}

export default api;