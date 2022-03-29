import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  role: "",
  fullname: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, role, fullname } = action.payload;
      state.email = email;
      state.role = role;
      state.fullname = fullname;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
