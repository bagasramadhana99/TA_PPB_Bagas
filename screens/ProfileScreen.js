import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = ({ route }) => {
  const { user } = route.params; // Ambil data user dari route params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text>Email: {user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ProfileScreen;
