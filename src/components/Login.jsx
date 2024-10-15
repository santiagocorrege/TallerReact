import * as React from 'react';
import {Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Container} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Error from './Comun/Error';
import Copyright from './Comun/Copyright';
import api from '../scripts/LlamadasFetch'
import { useDispatch } from 'react-redux';
import { login } from '../redux/features/infoSlice';
import NotAuthHeader from "./Comun/NotAuthHeader";


//Se puede quitar pero se queja de que no le doy un tema si no una ffuncion si le paso createTheme
const defaultTheme = createTheme();

export default function SignIn() {
  const [usuario, setUsuario] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [errorLogin, setErrorLogin] = React.useState({
    estado: true,
    mensaje: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(usuario.trim() !== "" && pass.trim() !== ""){
      const fetchLogin = async () =>{
        try{
          const loginResponse = await api.fetchLogin(usuario, pass);     
          console.log(loginResponse)                   
          if(loginResponse.codigo === 200){            
            dispatch(login({userId: loginResponse.id, apiKey: loginResponse.apiKey}))            
          }
          else{
            setErrorLogin({error: true, mensaje: loginResponse.mensaje});
            setUsuario("");
            setPass("");
          }
        }catch(e){
          console.log("Error 1", e);
          setErrorLogin({error: true, mensaje: 'No se ha podido establecer conexion con el servidor'});          
        }            
      }     
      fetchLogin();
    }    
  };

  return (
    <div className={"alignedcontainer"}>
      <NotAuthHeader></NotAuthHeader>
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
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="Usuario"
                name="user"
                autoComplete="username"
                autoFocus
                sx={{ bgcolor: "white" }}
                value={usuario}
                onChange={(e) => {
                  setUsuario(e.target.value);
                  setErrorLogin({
                    ...errorLogin,
                    estado: e.target.value.trim() === "" || pass.trim() === "",
                  });
                }}
                // error={true}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{ bgcolor: "white" }}
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                  setErrorLogin({
                    ...errorLogin,
                    estado:
                      e.target.value.trim() === "" || usuario.trim() === "",
                  });
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuerdame"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={errorLogin.estado}
                sx={{ mt: 3, mb: 2 }}
              >
                Ingresa
              </Button>
              <Error errorRegistro={errorLogin.mensaje}></Error>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/registro" variant="body2">
                    {"No tienes cuenta? Registrate!"}
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


