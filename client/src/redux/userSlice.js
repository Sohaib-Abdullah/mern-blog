import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true
        },
        loginSuccess:(state, action)=>{
            state.isFetching = false;
            state.currentUser = action.payload
        },
        loginFailure: (state)=>{
            state.isFetching = false;
            state.error = true;
    },
    clearLoginError: (state) => {
        state.error = null; // Clear the login error
      },
        favPost: (state, action)=>{
            console.log("action", action.payload);
    
           state.currentUser.favPosts = action.payload
        },
        logOut:(state)=>{
            state.currentUser = null;
            
      }
    },
})

export const {loginStart, loginSuccess, loginFailure, clearLoginError, favPost, logOut} = userSlice.actions;
export default userSlice.reducer;