import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:"auth",
    initialState:{
        logged:false,
        loading:true,
        email:"",
        id:"",
        profilePic:"",
    },
    reducers:{
        login:(state,action)=>{
            state.logged = true
            state.loading = false
            state.email = action.payload.email
            state.id = action.payload.id
            state.profilePic = action.payload.profilePic
        },
        logout:(state,action)=>{
            state.logged = false
            state.email = ""
            state.id = ""
            state.profilePic = ""
        }
        
    }
})
const authReducer = authSlice.reducer
export default authReducer

export const {login,logout} = authSlice.actions