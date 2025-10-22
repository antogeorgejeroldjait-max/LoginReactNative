import * as React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

function CustomBackButton({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
      <Text style={{ color: '#9447f2', fontSize: 16 }}>Back</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{}}>
        <Stack.Screen 
          name="SignIn" 
          component={SignInScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={({ navigation }) => ({
            headerLeft: () => <CustomBackButton navigation={navigation} />,
            title: 'Register',
            headerStyle: { backgroundColor: '#e6d4fdff' },
            headerTintColor: '#453232ff',
            headerTitleStyle: { fontWeight: 'bold' },
          })}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={({ navigation }) => ({
            headerLeft: () => <CustomBackButton navigation={navigation} />,
            title: 'Home',
            headerStyle: { backgroundColor: '#9447f2' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
