import { createAsyncThunk } from "@reduxjs/toolkit"; // Import createAsyncThunk from Redux Toolkit
import axios from "axios"; // Import axios for making HTTP requests

// Define an async thunk to fetch Pokemon data from the API
export const getPokeData = createAsyncThunk("getPokeData", async () => {
    try {
        // Make a GET request to the Pokemon API
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        
        // Log the response data to the console
        console.log(response.data);
        
        // Return the fetched data
        return response.data;
    } catch (err) {
        // Log an error message if fetching data fails
        console.log("Could not fetch data from API", err);
        
        // Return an empty array if an error occurs
        return [];
    }
});
