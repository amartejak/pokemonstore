import axios from 'axios';

const fetchPokemonData = async (): Promise<any[]> => {
    try {
        let pokemonData: any[] = [];
        let nextUrl = 'https://pokeapi.co/api/v2/pokemon';

        // Fetch all available pages of Pokémon data
        while (nextUrl) {
            const response = await axios.get(nextUrl);
            const pokemons = response.data.results;

            // Fetch details for each Pokémon
            const pokemonDetailsPromises = pokemons.map(async (pokemon: any) => {
                const detailsResponse = await axios.get(pokemon.url);
                return {
                    name: pokemon.name,
                    icon: detailsResponse.data.sprites.front_default,
                };
            });

            const pokemonDetails = await Promise.all(pokemonDetailsPromises);
            pokemonData = [...pokemonData, ...pokemonDetails];
            nextUrl = response.data.next;
        }

        return pokemonData;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return [];
    }
};

export default fetchPokemonData;
