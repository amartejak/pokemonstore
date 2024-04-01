import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme, View, Image, TouchableOpacity, FlatList, Text, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/counterReducer';
import { RootState } from '../redux/store';
import fetchPokemonData from '../components/fetchPokeData';
import { logger } from 'react-native-logs';
import { useFocusEffect } from '@react-navigation/native';

// Define navigation parameters
type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
};

// Define props for HomeScreen
type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }): JSX.Element => {
  // Dark mode check
  const isDarkMode = useColorScheme() === 'dark';

  // State variables
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPageData, setNextPageData] = useState<any[]>([]);

  // Reference to FlatList
  const flatListRef = useRef<FlatList<any> | null>(null);

  // Redux hooks
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // Logger instance
  const log = logger.createLogger();

  // Fetch data and preload next page when page changes
  useEffect(() => {
    fetchData();
    preloadNextPage();
  }, [page]);

  // Function to fetch Pokemon data
  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await fetchPokemonData(10, (page - 1) * 10);
    setPokemonData(data);
    setLoading(false);
    // Scroll to the top of the list when navigating to a new page
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }, [page]);

  // Function to preload next page data
  const preloadNextPage = useCallback(async () => {
    const nextPage = page + 1;
    const data = await fetchPokemonData(10, nextPage * 10);
    setNextPageData(data);
  }, [page]);

  // Scroll to the top of the list when navigating to a new page


  // Memoized Pokemon item component
  const MemorizedPokemonItem = React.memo(({ item }: { item: any }) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.icon }} style={styles.pokemonImage} />
      </View>
      <Text style={styles.pokemonName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => {
          dispatch(addToCart({ icon: item.icon, name: item.name, weight: item.weight }));
          log.info(`Added ${item.name} to cart`);// log info
        }}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  ));

  // Number of columns in FlatList
  const numColumns = 2;


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? 'black' : 'white'}
      />
      <FlatList
        ref={flatListRef}
        data={pokemonData}
        renderItem={({ item }) => <MemorizedPokemonItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.gridContainer}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.paginationButton, styles.previousButton]}
          onPress={() => setPage(prevPage => Math.max(1, prevPage - 1))}
          disabled={page === 1}
        >
          <Text style={styles.paginationButtonText}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartButtonText}>Cart ({cartItems.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paginationButton, styles.nextButton]}
          onPress={() => setPage(prevPage => prevPage + 1)}
        >
          <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="silver" />
        </View>
      )}
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#393232',
    paddingHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
  },
  cartButton: {
    backgroundColor: '#2F3032',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  cartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  item: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#4D4545',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'silver',
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 5,
    overflow: 'hidden',
    color: 'grey',
  },
  pokemonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 2,
    color: 'white',
  },
  addToCartButton: {
    backgroundColor: '#2F3032',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8D6262',
  },
  gridContainer: {
    paddingBottom: 100,
  },
  paginationButton: {
    backgroundColor: '#2F3032',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  paginationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  previousButton: {
    marginRight: 'auto',
  },
  nextButton: {
    marginLeft: 'auto',
    color: '#2F3032',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});

export default HomeScreen;
