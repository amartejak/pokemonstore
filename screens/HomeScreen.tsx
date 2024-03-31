import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme, View, Image, Dimensions, TouchableOpacity, FlatList, Text, Button } from 'react-native';
import fetchPokemonData from '../components/fetchPokeData';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/counterReducer';
import { RootState } from '../redux/store';
// import { RootState } from '../redux/store'
// import { getPokeData } from '../redux/pokeAction';


type RootStackParamList = {
    // Define your route names here
    Home: undefined;
    Cart: undefined;
  };
  
  type HomeScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>; // Adjust 'Home' to the actual route name
  };
  


type SectionProps = {
  title: string;
};

const Section: React.FC<SectionProps> = React.memo(({ title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? 'white' : 'black',
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
});

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart).cartItems;
  // const {poke} = useSelector((state: RootState) => state.poke)

  useEffect(() => {
    fetchData();
  }, [page]);
  

    // useEffect(() => {
    //     dispatch(getPokeData());
    // }, []);


  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await fetchPokemonData();
    setPokemonData(prevData => [...prevData, ...data]);
    setLoading(false);
  }, [page]);

  const renderPokemonItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.item}>
      <Section title={item.name}/>
      <Image source={{ uri: item.icon }} style={styles.pokemonImage} />
      <Button
          onPress={() => {
          dispatch(addToCart({ icon: item.icon, name: item.name })); // Dispatch addToCart action with icon and name
          console.log("you added :", item.name);
          }}
          title="Add to cart"
        />
    </TouchableOpacity>
  );

  const renderCartItem = ({ item }: { item: { name: string } }) => (
    <View style={styles.cartItem}>
      <Text>{item.name}</Text>
    </View>
  );

  const numColumns = 2;



  return (
    <SafeAreaView style={styles.container}>
    <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? 'black' : 'white'}
      />
      <View style={styles.navBar}>
        <Text style={styles.navText}> Poké Store</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.cartButtonText}>Cart</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={pokemonData}
        renderItem={renderPokemonItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        onEndReached={() => {
          if (!loading) {
            setPage(prevPage => prevPage + 1);
          }
        }}
        onEndReachedThreshold={0.1}
      /> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b3a125',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#ffde00',
    paddingHorizontal: 20,
  },
  navText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b4cca',
  },
  item: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff084a',
    height: 250, // Adjusted height to accommodate the button
  },
  pokemonImage: {
    width: Dimensions.get('window').width / 2 - 20,
    height: 100,
    resizeMode: 'contain',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  cartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b4cca',
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;
