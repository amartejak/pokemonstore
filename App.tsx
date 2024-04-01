import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import { store } from './redux/store';
import { Provider } from 'react-redux'

// Define the type for your route parameters
type RootStackParamList = {
  Home: undefined;
  Cart: undefined; // Specify cartItems as parameter for Cart screen
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' 
         screenOptions={{
          headerStyle: {
            backgroundColor: '#393232', // Change the color of the header bar here
          },
          headerTitleAlign: 'center', // Align the header title to the center
          headerTintColor: 'white', // Change the color of the header title here
        }}
        >
          <Stack.Screen name="Home" component={HomeScreen} 
          
          options={{ 
            title: 'Poke Store',
            headerTitleStyle: {
              color: 'white',
              fontFamily: 'Roboto' // Change the color here
            },
          }}
          
          />
          <Stack.Screen name="Cart" component={CartScreen} 
          options={{ 
            title: 'Cart Summary',
            headerTitleStyle: {
              color: 'white', // Change the color here
            },
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
