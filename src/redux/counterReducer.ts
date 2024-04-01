import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  icon: string;
  name: string;
  weight: number;
  quantity: number;
  price: number;
}

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ icon: string; name: string; weight:number }>) {
      const { icon, name, weight } = action.payload;
      const existingItem = state.cartItems.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
      } else {
        state.cartItems.push({ icon, name, weight, quantity: 1, price: 0.5 }); // Add new item to cart
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter((item, index) => index !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const itemName = action.payload;
      const itemToIncrease = state.cartItems.find(item => item.name === itemName);
      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const itemName = action.payload;
      const itemToDecrease = state.cartItems.find(item => item.name === itemName);
      if (itemToDecrease && itemToDecrease.quantity > 0) {
        itemToDecrease.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
