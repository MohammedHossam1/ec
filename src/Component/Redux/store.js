import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./counterSlice";

export let store=configureStore({
    reducer:{
        counter:CounterReducer
    }
})