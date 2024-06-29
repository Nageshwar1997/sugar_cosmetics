import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      console.log("User Details userSlice :", action.payload);
      state.user = action.payload;
      console.log("User State userSlice :", state.user);
      state.isAuthenticated = true;
    },

    clearUserDetails: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   isAuthenticated: false,
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUserDetails: (state, action) => {
//       console.log("User Details userSlice :", action.payload);
//       state.user = action.payload;
//       console.log("User State userSlice :", state.user);
//       state.isAuthenticated = true;
//     },

//     clearUserDetails: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { setUserDetails, clearUserDetails } = userSlice.actions;

// export default userSlice.reducer;
