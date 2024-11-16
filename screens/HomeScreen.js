import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';
import axios from 'axios';
import Timer from './Timer';
import { FontAwesome } from '@expo/vector-icons'; // Import ikon dari expo

const HomeScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  const apiKey = '676d861baad50d87a3547616be5907ee';

  useEffect(() => {
    loadSound();
    requestLocationPermission();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const loadSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setSound(sound);
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission to access location was denied");
      return;
    }
    const userLocation = await Location.getCurrentPositionAsync({});
    setLocation(userLocation);
    fetchWeather(userLocation.coords.latitude, userLocation.coords.longitude);
  };

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);

      const temp = response.data.main.temp;
      if (temp < 30) {
        Alert.alert('Info Cuaca', 'Cuaca Mendukung untuk BERAK');
      } else {
        Alert.alert('Info Cuaca', 'Suhunya panas Kurang cocok untuk BERAK');
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const playSound = async () => {
    if (sound) {
      await sound.replayAsync();
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
    }
  };

  const handleTimerChange = (newSeconds, isActive) => {
    setSeconds(newSeconds);
  
    if (newSeconds === 10) {
      playSound();
      setIsPlaying(true);
    }
  
    if (!isActive) {
      stopSound();
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.container}>
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>Weather in {weather.name}</Text>
          <Text style={styles.weatherText}>Temp: {weather.main.temp}°C</Text>
          <Text style={styles.weatherText}>Condition: {weather.weather[0].description}</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text>Welcome to Toilet Timer!</Text>
        <Text>User Email: {user.email}</Text>
        <Timer onTimerChange={handleTimerChange} />
      </View>

      {/* Tombol Ikon untuk HealthArticles */}
      <TouchableOpacity 
        style={styles.iconContainer}
        onPress={() => navigation.navigate('HealthArticles')} 
      >
        <FontAwesome name="heartbeat" size={30} color="#FF4081" />
        <Text style={styles.iconText}>Berita</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  weatherContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(33, 150, 243, 0.8)',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  weatherText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  iconText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FF4081',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
