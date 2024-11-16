import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import BathroomList from './screens/BathroomList';
import BathroomDetail from './screens/BathroomDetail';
import HealthArticles from './screens/HealthArticles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BathroomStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bathrooms" component={BathroomList} />
      <Stack.Screen name="BathroomDetail" component={BathroomDetail} />
    </Stack.Navigator>
  );
}

function HomeStack({ route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} initialParams={route.params} />
      <Stack.Screen name="HealthArticles" component={HealthArticles} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [isSplash, setIsSplash] = useState(true);

  const handleSplashFinish = () => {
    setIsSplash(false);
  };

  return (
    <NavigationContainer>
      {isSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : user ? (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home-outline';
              } else if (route.name === 'Bathrooms') {
                iconName = 'water-outline';
              } else if (route.name === 'Profile') {
                iconName = 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeStack}
            initialParams={{ user }} 
            options={{ headerShown: false }}  
          />
          <Tab.Screen 
            name="Bathrooms" 
            component={BathroomStack} 
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen} 
            initialParams={{ user }} 
          />
        </Tab.Navigator>
      ) : (
        <LoginScreen setUser={setUser} />
      )}
    </NavigationContainer>
  );
}
