import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user:null,
    dob:null,
    code:null,
    name:null,
    email:null,
    password:null,
    username:null,
    isLoggedIn:false
}

export const UserSlice = createSlice({
    name:'User',
    initialState,
    reducers:{
        login: (state,action) => {
           state.user = action.payload;
        },
        logout: (state,action) => {
            state.user = null;
        },
        setName: (state,action) => {
           state.name = action.payload;
        },
        setDob: (state,action) => {
           state.dob = action.payload;
        },
        setCode: (state,action) => {
           state.code = action.payload;
        },
        setEmail: (state,action) => {
           state.email = action.payload;
        },
        setPassword: (state,action) => {
            state.password = action.payload;
        },
        setIsLoggedIn: (state,action) => {
            state.isLoggedIn = action.payload;
        },
        setUsername: (state,action) => {
            state.username = action.payload;
        }
    }
});

export const {login,logout,setCode,setDob,setEmail,setName,setPassword,setIsLoggedIn,setUsername} = UserSlice.actions;

export const getUser = (state) => state.user;
export const getDetails = (state) => state;
export const getIsLogged = (state) => state.isLoggedIn;
export const getUsername = (state) => state.username;
 
export default UserSlice.reducer;