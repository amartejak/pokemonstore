// import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

// const initialState: CounterState = {
//   value: 0,
// }

// export const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment: (state) => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers. It
//       // doesn't actually mutate the state because it uses the Immer library,
//       // which detects changes to a "draft state" and produces a brand new
//       // immutable state based off those changes
//       state.value += 1
//     },
//     decrement: (state) => {
//       state.value -= 1
//     },
//     incrementByAmount: (state, action: PayloadAction<number>) => {
//       state.value += action.payload
//     },
//   },
// })

// // Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// export default counterSlice.reducer

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface CartItem {
//   icon: string;
//   name: string;
//   quantity: number;
//   price: number;
// }

// export interface CartState {
//   cartItems: CartItem[];
// }

// const initialState: CartState = {
//   cartItems: [],
// };

// export const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart(state, action: PayloadAction<{ icon: string; name: string }>) {
//       const { icon, name } = action.payload;
//       const existingItem = state.cartItems.find(item => item.name === name);
//       if (existingItem) {
//         existingItem.quantity += 1; // Increase quantity if item already exists
//       } else {
//         state.cartItems.push({ icon, name, quantity: 1, price: 0 }); // Add new item to cart
//       }
//     },
//     removeFromCart(state, action: PayloadAction<number>) {
//       state.cartItems = state.cartItems.filter((item, index) => index !== action.payload);
//     },
//   },
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;

// export default cartSlice.reducer;

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
