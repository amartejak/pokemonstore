import { createSlice } from "@reduxjs/toolkit";
import { getPokeData } from "./pokeAction";


const initState = {
    poke: []

}

export const pokeSlice = createSlice({
    name: "poke",
    initialState: initState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPokeData.fulfilled, (state, action) =>{
            state.poke = action.payload
        })
    }
})

export default pokeSlice.reducer