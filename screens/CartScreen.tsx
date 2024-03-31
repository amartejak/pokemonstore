import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/counterReducer';

type RootStackParamList = {
  // Define your route names here
  Home: undefined;
};

type CartScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>; // Adjust 'Home' to the actual route name
};

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  const removeItemFromCart = (itemName: string) => {
    const itemIndex = cartItems.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
      dispatch(removeFromCart(itemIndex));
    }
  };



  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Text>{item.name}</Text>
      <View style={styles.quantityControls}>
        <Button title="-" onPress={() => dispatch(decreaseQuantity(item.name))} />
        <Text>{item.quantity}</Text>
        <Button title="+" onPress={() => dispatch(increaseQuantity(item.name))} />
      </View>
      <Text>${item.price * item.quantity}</Text>
      <Button title="Remove" onPress={() => removeItemFromCart(item.name)} />
    </View>
  );

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.name.toString()}
      />
      <View style={styles.summary}>
        <Text>Total: ${calculateTotalPrice()}</Text>
        <Button title="Checkout" onPress={() => console.log('Implement checkout logic')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default CartScreen;
