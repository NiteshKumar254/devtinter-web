// // import { createSlice } from "@reduxjs/toolkit";
// // const feedSlice = createSlice({
// //      name: "feed", 
// //      initialState: null,
// //       reducers: { 
// //         addFeed: (state, action) =>{
// //           action.payload;
// //         },
// //         removeUserFromFeed: (state, action) => {
// //           const newFeed =state.filter((user)=> user.id !== action.payload);
// //           return newFeed;
// //         },
// //         },
// //       });
// // export const { addFeed } = feedSlice.actions; 
// // export default feedSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// const feedSlice = createSlice({
//   name: "feed",
//   initialState: null,
//   reducers: {
//     addFeed: (state, action) => {
//       return action.payload;  // Fix: actually return the payload
//     },
//     removeUserFromFeed: (state, action) => {
//       const newFeed = state.filter((user) => user.id !== action.payload);
//       return newFeed;
//     },
//   },
// });

// export const { addFeed, removeUserFromFeed } = feedSlice.actions;
// export default feedSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
