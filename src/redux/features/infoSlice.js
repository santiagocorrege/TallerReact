import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuario: undefined,
  categorias: [],
  eventos: undefined,
};

const infoSlice = createSlice({
  name: "infoSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      if (action.payload) {
        // Asegúrate de que 'state.usuario' está bien definido
        const userId = action.payload.userId;
        const apiKey = action.payload.apiKey;
        state.usuario = { userId, apiKey };
        localStorage.setItem("userId", userId);
        localStorage.setItem("apiKey", apiKey);
      } else {
        const userId = localStorage.getItem("userId");
        const apiKey = localStorage.getItem("apiKey");
        if (userId !== "undefined" || apiKey !== "undefined") {
          if (!state.usuario) {
            state.usuario = { userId, apiKey };
          }
        }
      }
    },
    logout: (state) => {
      state.usuario = undefined;
      localStorage.clear();
    },
    setCategorias: (state, action) => {
      if (action.payload) {
        state.categorias = action.payload;
      }
    },
    setEventos: (state, action) => {
      if (action.payload) {
        state.eventos = action.payload;
      }
    },
    modificarEvento: (state, action) => {
      if(action.payload.operacion === "eliminar"){
        const arr = state.eventos.filter((e) => e.id !== action.payload.id);        
        state.eventos = arr; 
      }else if(action.payload.operacion === "agregar" && state.eventos !== undefined){
        state.eventos = [...state.eventos, action.payload.evento]
      }
    }
  },
});

export const { login, setCategorias, setEventos, modificarEvento, logout } = infoSlice.actions;
export default infoSlice.reducer;
