import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getPokeData = createAsyncThunk("getPokeData", async () => {

    try{
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        console.log(response.data);
        return response.data;
    } catch(err){
        console.log("Could not fetch data from API", err);
        return []
    }
    
});