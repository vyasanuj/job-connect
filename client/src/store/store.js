import { configureStore } from "@reduxjs/toolkit";
import JobReducer from './slices/jobSlice.js'
import UserReducer from './slices/userSlice.js'
import applicationReducer from "./slices/applicationSlice";

const store = configureStore({
    reducer: {
        user : UserReducer ,
        jobs : JobReducer ,
        applications: applicationReducer 
    } 

})

export default store ;