import { configureStore, createReducer } from '@reduxjs/toolkit'
import  cartSlice  from './counterReducer'
import  pokeSlice  from './pokeReducer'


export const store = configureStore({
  reducer: {
    poke: pokeSlice,
    cart: cartSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch