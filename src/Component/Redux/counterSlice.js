import { createSlice } from "@reduxjs/toolkit";

let initialState={counter:0,userName:''}
let counterSlice=createSlice({
    name:'CounterSlice',
    initialState,
    reducers:{
increase:()=>{
    // console.log('inc');

},decrease:()=>{
    // console.log('dec');
}
    }
})
export let CounterReducer=counterSlice.reducer;
export let {increase,decrease}=counterSlice.actions
