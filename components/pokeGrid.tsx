// // components/PokemonGrid.tsx

// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, FlatList, Text } from 'react-native';
// import fetchPokemonData from './fetchPokeData';

// const PokemonGrid: React.FC = () => {
//     const [pokemonData, setPokemonData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             const data = await fetchPokemonData();
//             setPokemonData(data);
//         };
//         fetchData();
//     }, []);

//     return (
//         <ScrollView>
//             <FlatList
//                 data={pokemonData}
//                 keyExtractor={(item) => item.name}
//                 renderItem={({ item }) => (
//                     <View>
//                         <Text>{item.name}</Text>
//                         {/* Render Pokémon icon here */}
//                     </View>
//                 )}
//             />
//         </ScrollView>
//     );
// };

// export default PokemonGrid;
