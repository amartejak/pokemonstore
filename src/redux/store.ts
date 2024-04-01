import { configureStore, createReducer } from '@reduxjs/toolkit';
import cartSlice from './counterReducer'; // Import the cart slice
import pokeSlice from './pokeReducer'; // Import the poke slice

// Configure the Redux store with combined reducers
export const store = configureStore({
  reducer: {
    poke: pokeSlice, // Set the poke slice reducer under the 'poke' key
    cart: cartSlice, // Set the cart slice reducer under the 'cart' key
  },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {poke: PokeState, cart: CartState}
export type AppDispatch = typeof store.dispatch;
