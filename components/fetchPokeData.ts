import axios from 'axios';

interface PokemonDetails {
    name: string;
    icon: string;
    weight: number;
}

const fetchPokemonData = async (limit: number, offset: number): Promise<PokemonDetails[]> => {
    try {
        let pokemonData: PokemonDetails[] = [];
        const nextUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
        
        const response = await axios.get(nextUrl);
        const pokemons = response.data.results;

        // Fetch details for each Pokémon
        const pokemonDetailsPromises = pokemons.map(async (pokemon: any) => {
            const detailsResponse = await axios.get(pokemon.url);
            return {
                name: pokemon.name,
                icon: detailsResponse.data.sprites.front_default,
                weight: detailsResponse.data.weight, 
            };
        });

        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        pokemonData = [...pokemonData, ...pokemonDetails];
    
        return pokemonData;
        
        
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return [];
    }
};

export default fetchPokemonData;
