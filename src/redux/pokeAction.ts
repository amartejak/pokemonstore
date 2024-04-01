import { createAsyncThunk } from "@reduxjs/toolkit"; // Import createAsyncThunk from Redux Toolkit
import axios from "axios"; // Import axios for making HTTP requests
import { logger } from 'react-native-logs'; // Import the logger from react-native-logs

// Create a logger instance
const log = logger.createLogger();

// Define an async thunk to fetch Pokemon data from the API
export const getPokeData = createAsyncThunk("getPokeData", async () => {
    try {
        // Make a GET request to the Pokemon API
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        
        // Log the response data using the logger
        log.info("Fetched Pokemon data:", response.data);
        
        // Return the fetched data
        return response.data;
    } catch (err) {
        // Log an error message if fetching data fails
        log.error("Could not fetch data from API:", err);
        
        // Return an empty array if an error occurs
        return [];
    }
});
