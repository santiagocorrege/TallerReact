import * as React from 'react';
import {Button, CssBaseline, TextField, Link, Grid, Box, Container, InputLabel, MenuItem, FormControl, Select, createTheme, ThemeProvider} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Copyright from './Comun/Copyright';
import Error from './Comun/Error';
import NotAuthHeader from "./Comun/NotAuthHeader";
import { login } from "../redux/features/infoSlice";
import api from '../scripts/LlamadasFetch';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {  
  const [usuario, setUsuario] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [departamento, setDepartamento] = React.useState(1);
  const [ciudad, setCiudad] = React.useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ErrorValidacion, setError] = React.useState({
    errorUsuario:{
      error: false,    
      mensaje: '',  
    },
    errorPassword:{
      error: false,    
      mensaje: '',    
    },
    errorRegistro:""
  });

  const [departamentosData, setDepartamentosData] = React.useState([])
  const [ciudadesData, setCiudadesData] = React.useState([])
  
  React.useEffect(() => {
    const fetchDepartamentos = async () => {
      try{
        const dataDepartamentos = await api.fetchDepartamentos();
        setDepartamentosData(dataDepartamentos); 
        if(dataDepartamentos.length === 0){
          setError({...ErrorValidacion, errorRegistro: "Servidor en mantenimiento"});
        }      
      }catch(e){
        console.log("ERROR", e);
        setError({...ErrorValidacion, errorRegistro: "Servidor en mantenimiento Error"});
      }      
    };
    fetchDepartamentos();    
  }, []);

  const departamentoHandler = async (idDepartamento) => {        
    try{
      setDepartamento(idDepartamento);
      const dataCiudades = await api.fetchCiudades(idDepartamento);
      setCiudadesData(dataCiudades); 
    }catch(e){
      setError({...ErrorValidacion, errorRegistro: e.toString()});
    }
    
  };

  const ValidacionUsuario = () => {              
    if (!/^[a-zA-Z0-9_-]{6,12}$/.test(usuario)) {
      setError(
        {
        ...ErrorValidacion,
        errorUsuario: { error: true, mensaje: 'El usuario debe tener entre 6 y 12 caracteres'}
        }
      )
    }else{
      setError(
        {
        ...ErrorValidacion,
        errorUsuario: { error: false, mensaje: ''}
        })
    }                
  }

  const ValidacionPass = () => {             
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,16}$/.test(pass)) {
      setError({
        ...ErrorValidacion,
        errorPassword: {error: true, mensaje: 'La contraseña debe tener al menos 8 caracteres e incluir al menos una letra y un número.'}
      })
    }else{
      setError({
        ...ErrorValidacion,
        errorPassword: {error: false, mensaje: ''}
      })
    }               
  }

  const ValidacionRegistro = () => {
    if(usuario === '' || pass === ''){
      setError({...ErrorValidacion, errorRegistro: 'Rellene todos los campos'});
    }
    else if(ErrorValidacion.errorPassword.error || ErrorValidacion.errorUsuario.error){
      setError({...ErrorValidacion, errorRegistro: 'Ingrese usuario y/o contrasena validos'});
    }else if(departamento === 1){
      setError({...ErrorValidacion, errorRegistro: 'Seleccione un departamento'});
    }else if(ciudad === 1){
      setError({...ErrorValidacion, errorRegistro: 'Seleccione una ciudad'});
    }else{
      setError({...ErrorValidacion, errorRegistro: ''});
    }
  }
  const handleSubmit = (event) => {  
    event.preventDefault();
    ValidacionRegistro();
    if(!ErrorValidacion.errorRegistro){
      try{
        const fetchRegistro = async () => {
          const data = await api.fetchRegistro(
            usuario,
            pass,
            departamento,
            ciudad
          );
          if (data.codigo === 200) {
            const loginResponse = await api.fetchLogin(usuario, pass);
            if (loginResponse.codigo === 200) {
              dispatch(
                login({
                  userId: loginResponse.id,
                  apiKey: loginResponse.apiKey,
                })                
              );
              navigate("/");
            }else{
              setError("Error en el servidor");
            }            
          }
        };
        fetchRegistro();

      }catch(e){
        setError("Error en el registro");
      }      
    }
  
  };

  return (
    <div className={"alignedcontainer"}>
      <NotAuthHeader />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" sx={{ bgcolor: "#ffd3ec" }}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="user"
                    label="Usuario"
                    name="user"
                    autoComplete="off"
                    sx={{ bgcolor: "white" }}
                    onChange={(e) => {
                      setUsuario(e.target.value);
                      ValidacionUsuario();
                    }}
                    value={usuario}
                    error={ErrorValidacion.errorUsuario.error}
                    helperText={ErrorValidacion.errorUsuario.mensaje}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    sx={{ bgcolor: "white" }}
                    onChange={(e) => {
                      setPass(e.target.value);
                      ValidacionPass();
                    }}
                    value={pass}
                    error={ErrorValidacion.errorPassword.error}
                    helperText={ErrorValidacion.errorPassword.mensaje}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ bgcolor: "white" }}>
                    <InputLabel id="departamento-label">
                      Departamento
                    </InputLabel>
                    <Select
                      required
                      labelId="departamento-label"
                      id="departamento"
                      value={departamento} //Use state para la seleccion
                      label="departamento"
                      onChange={(e) => {
                        departamentoHandler(e.target.value);
                      }}
                    >
                      <MenuItem value={1} key={1} disabled>
                        Seleccione Uno
                      </MenuItem>
                      {departamentosData.map((d) => (
                        <MenuItem value={d.id} key={d.id}>
                          {d.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ bgcolor: "white" }}>
                    <InputLabel id="ciudad-label">Ciudad</InputLabel>
                    <Select
                      required
                      labelId="ciudad-label"
                      id="ciudad"
                      value={ciudad}
                      label="ciudad"
                      onChange={(e) => {
                        setCiudad(e.target.value);
                      }}
                      disabled={
                        ciudadesData && ciudadesData.length ? false : true
                      }
                    >
                      {ciudadesData && ciudadesData.length > 0 ? (
                        ciudadesData.map((d) => (
                          <MenuItem value={d.id} key={d.id}>
                            {d.nombre}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value={1} key={1}>
                          Seleccione Uno
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Error errorRegistro={ErrorValidacion.errorRegistro}></Error>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Ya tienes una cuenta? Ingresa!
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

