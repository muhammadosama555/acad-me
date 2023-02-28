import { createSlice } from "@reduxjs/toolkit";

export const academySlice = createSlice({
  name: "academySlice",
  initialState: {
    academyData: [],
    academyDetails: [],
  },
  reducers: {
      getAcademySuccess: (state, action) => {
        state.academyData = action.payload;
      },
      getAcademyDetailsSuccess: (state, action) => {
        state.academyDetails = action.payload;
      }
  }
});

export const {
  getAcademySuccess,
  getAcademyDetailsSuccess,
 
} = academySlice.actions;

export default academySlice.reducer;