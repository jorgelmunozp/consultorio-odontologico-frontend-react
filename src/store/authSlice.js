import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: { logged: false }, };  // 👈 redux-persist cargará lo guardado en localStorage automáticamente

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => { state.user = { ...action.payload, logged: true } },
    logout: (state) => { state.user = { logged: false } },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;