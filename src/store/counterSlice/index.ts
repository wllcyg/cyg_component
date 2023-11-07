import {createSlice} from "@reduxjs/toolkit";

export const countSlice = createSlice({
  name:'counter',
  initialState:{
    value:0
  },
  reducers:{
    increment:state =>{
      state.value += 1
    },
    decrement:state =>{
      state.value -= 1
    },
    incrementByAmount:(state,action) =>{
      console.log(action,'111111111111')
      state.value += action.payload
    }
  }
})
export const { increment, decrement ,incrementByAmount } = countSlice.actions
export default countSlice.reducer;
