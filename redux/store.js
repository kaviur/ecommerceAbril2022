import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/Cart";
import authReducer from "../features/auth";
import paymentReducer from "../features/Payments";

const store = configureStore({
    reducer:{
        cart:cartReducer,
        auth:authReducer,
        payment:paymentReducer
    },
})

export default store