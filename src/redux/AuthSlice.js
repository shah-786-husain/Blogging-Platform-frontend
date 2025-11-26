// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

/**
 *  Auth Slice
 * Handles authentication state (login/logout user info)
 */
const initialState = {
  user: null, // Will hold logged-in user data
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set logged-in user data
    setUser: (state, action) => {
      state.user = action.payload;
    },

    //  Remove user data on logout
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
