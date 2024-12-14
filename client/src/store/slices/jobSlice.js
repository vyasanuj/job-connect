import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jobslice = createSlice ({
    name : "jobs",
    initialState : {
        jobs : [] ,
        loading : false ,
        error : null ,
        message : null ,
        singleJOb : {} ,
        myJobs : []
    },
    reducers: {
      requestForAllJobs(state, action) {
        state.loading = true;
        state.error = null;
      },
      successForAllJobs(state, action) {
        state.loading = false;
        state.jobs = action.payload;
        state.error = null;
      },
      failureForAllJobs(state, action) {
        state.loading = false;
        state.error = action.payload;
      },
      requestForSingleJob(state, action) {
        state.message = null;
        state.error = null;
        state.loading = true;
      },
      successForSingleJob(state, action) {
        state.loading = false;
        state.error = null;
        state.singleJOb = action.payload;
      },
      failureForSingleJob(state, action) {
        state.singleJOb = state.singleJob;
        state.error = action.payload;
        state.loading = false;
      },
      requestForPostJob(state, action) {
        state.message = null;
        state.error = null;
        state.loading = true;
      },
      successForPostJob(state, action) {
        state.message = action.payload;
        state.error = null;
        state.loading = false;
      },
      failureForPostJob(state, action) {
        state.message = null;
        state.error = action.payload;
        state.loading = false;
      },
  
      requestForDeleteJob(state, action) {
        state.loading = true;
        state.error = null;
        state.message = null;
      },
      successForDeleteJob(state, action) {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
      },
      failureForDeleteJob(state, action) {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      },
  
      requestForMyJobs(state, action) {
        state.loading = true;
        state.myJobs = [];
        state.error = null;
      },
      successForMyJobs(state, action) {
        state.loading = false;
        state.myJobs = action.payload;
        state.error = null;
      },
      failureForMyJobs(state, action) {
        state.loading = false;
        state.myJobs = state.myJobs;
        state.error = action.payload;
      },
  
      clearAllErrors(state, action) {
        state.error = null;
        state.jobs = state.jobs;
      },
      resetJobSlice(state, action) {
        state.error = null;
        state.jobs = state.jobs;
        state.loading = false;
        state.message = null;
        state.myJobs = state.myJobs;
        state.singleJOb = {};
      },
    },
  });

export const fetchJobs =
(city, niche, searchKeyword = "") =>
async (dispatch) => {
  try {
    dispatch(jobslice.actions.requestForAllJobs());
    let link = "http://localhost:8000/api/v1/job/getalljob?";

    let queryParams = [];
    if (searchKeyword) {
      queryParams.push(`searchKeyword=${searchKeyword}`);
    }
    if (city) {
      queryParams.push(`city=${city}`);
      console.log(city)
    }
    if (niche) {
      queryParams.push(`niche=${niche}`);
    }

    link += queryParams.join("&");
    console.log("Fetching jobs from URL:", link);
    const response = await axios.get(link, { withCredentials: true });
    console.log(JSON.stringify(response.data.statuscode.jobs))
    dispatch(jobslice.actions.successForAllJobs(response.data.statuscode.jobs));
    dispatch(jobslice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobslice.actions.failureForAllJobs(error.response.data.message));
  }
};

export const fetchsinglejob = (jobid) => async (dispatch) => {
  dispatch(jobslice.actions.requestForSingleJob());
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/job/getASingleJob/${jobid}`,
      { withCredentials: true }
    );
    // Access job data correctly from response
    const jobData = response.data?.statuscode?.job;
    if (jobData) {
      dispatch(jobslice.actions.successForSingleJob(jobData));
      dispatch(jobslice.actions.clearAllErrors());
    } else {
      throw new Error("Job details not found in response.");
    }
  } catch (error) {
    dispatch(jobslice.actions.failureForSingleJob(error.response?.data?.message || error.message));
  }
};

export const getMyJobs = () => async (dispatch) => {
  dispatch(jobSlice.actions.requestForMyJobs());
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/job/getmyjob`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForMyJobs(response.data.myJobs));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForMyJobs(error.response.data.message));
  }
};


export const deleteJob = (id) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForDeleteJob());
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/v1/job/deletejob/${id}`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForDeleteJob(response.data.message));
    dispatch(clearAllJobErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForDeleteJob(error.response.data.message));
  }
};


  export const clearAllJobErrors = () => (dispatch) => {
    dispatch(jobslice.actions.clearAllErrors());
  };

  export const resetJobSlice = () => (dispatch) => {
    dispatch(jobSlice.actions.resetJobSlice());
  };
  export default jobslice.reducer;




