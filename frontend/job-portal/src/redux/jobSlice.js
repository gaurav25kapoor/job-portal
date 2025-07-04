import { JOB_API_END_POINT } from "@/utils/constant";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    allAdminJobs: [],
    searchJobsByText: "",
    allAppliedJobs: [],
    searchedQuery: ""
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobsByText: (state, action) => {
      state.searchJobsByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobsByText,
  setAllAppliedJobs,
  setSearchedQuery
} = jobSlice.actions;

export default jobSlice.reducer;

// THUNK
export const fetchAllJobs = () => async (dispatch) => {
  try {
    const res = await axios.get(`${JOB_API_END_POINT/get}`); 
    dispatch(setAllJobs(res.data));
  } catch (err) {
    console.error("Failed to fetch jobs", err);
  }
};
