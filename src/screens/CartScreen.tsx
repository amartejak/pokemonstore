import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { removeFromCart, increaseQuantity, decreaseQuantity } from './redux/counterReducer';
import { logger } from 'react-native-logs'; // Import Logger from react-native-log

const log = logger.createLogger(); // Create a logger instance

const CartScreen = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  // Function to remove an item from the cart and log the action
  const removeItemFromCart = (itemName: string) => {
    const itemIndex = cartItems.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
      dispatch(removeFromCart(itemIndex));
      log.info(`Removed ${itemName} from cart`); // Log when item is removed from cart
    }
  };

  // Function to render each item in the cart
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.icon }} style={styles.itemIcon} /> 
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemWeight}>wt : {item.weight}</Text>
        <Text style={styles.itemPrice}>${item.weight * item.price * item.quantity}</Text>
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={() => removeItemFromCart(item.name)}>
          <Text style={styles.removeButton}>Remove</Text>
        </TouchableOpacity>
        <View style={styles.quantityControls}>
          <Button title="-" onPress={() => dispatch(decreaseQuantity(item.name))} color= 'rgba(255, 255, 255, 0.2)' />
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Button title="+" onPress={() => dispatch(increaseQuantity(item.name))} color= 'rgba(255, 255, 255, 0.2)' />
        </View>
      </View>
    </View>
  );

  // Function to calculate total price of all items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price * item.weight, 0);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.name.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.summary}>
        <Text style={styles.totalText}>Total: ${calculateTotalPrice()}</Text>
        <TouchableOpacity onPress={() => log.info('Implement checkout logic')}>
          <Text style={styles.checkoutButton}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#4D4545',
  },
  listContainer: {
    flexGrow: 1,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  itemDetails: {
    flex: 1,
  },
  itemIcon: {
    width: 60, 
    height: 70, 
    marginRight: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  itemWeight: {
    fontSize: 13,
    color: 'silver',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "silver"
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 18,
    color: 'silver',
  },
  removeButton: {
    marginRight: 20,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'black',
    color: 'silver',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 15,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'silver',
    marginLeft: 5,
  },
  checkoutButton:{
    marginRight: 5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'silver',
    backgroundColor: 'black',
    color: 'silver',
  }
});

export default CartScreen;
