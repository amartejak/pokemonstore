import axios from 'axios';
import { logger } from 'react-native-logs'; // Import Logger from react-native-log

// Create a logger instance
const log = logger.createLogger();

// Define the interface for Pokemon details
interface PokemonDetails {
    name: string;
    icon: string;
    weight: number;
}

/**
 * Fetches Pokémon data from the PokeAPI.
 * @param limit The maximum number of Pokémon to fetch.
 * @param offset The offset for pagination.
 * @returns A Promise that resolves to an array of PokemonDetails objects.
 */
const fetchPokemonData = async (limit: number, offset: number): Promise<PokemonDetails[]> => {
    try {
        // Initialize an empty array to store PokemonDetails
        let pokemonData: PokemonDetails[] = [];

        // Construct the URL for fetching Pokemon data with the given limit and offset
        const nextUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
        
        // Fetch the data from the PokeAPI
        const response = await axios.get(nextUrl);
        const pokemons = response.data.results;

        // Fetch details for each Pokémon concurrently
        const pokemonDetailsPromises = pokemons.map(async (pokemon: any) => {
            const detailsResponse = await axios.get(pokemon.url);
            return {
                name: pokemon.name,
                icon: detailsResponse.data.sprites.front_default,
                weight: detailsResponse.data.weight, 
            };
        });

        // Wait for all promises to resolve and collect the details
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        pokemonData = [...pokemonData, ...pokemonDetails];
    
        return pokemonData;
        
    } catch (error) {
        // Log error using the logger instance
        log.error('Error fetching Pokémon data:', error);
        return [];
    }
};

export default fetchPokemonData;
