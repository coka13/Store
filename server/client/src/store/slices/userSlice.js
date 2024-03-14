import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  isAdmin: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.isAdmin = action.payload.isAdmin;
    },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export const { setLogin, setAdmin } = userSlice.actions;

export default userSlice.reducer;
