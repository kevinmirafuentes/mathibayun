import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import PracticeScreen from './PracticeScreen';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home', headerShown: false }}
          />
          <Stack.Screen
            name="Practice"
            component={PracticeScreen}
            options={{ title: 'Practice' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;