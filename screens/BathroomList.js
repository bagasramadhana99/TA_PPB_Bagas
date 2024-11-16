import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BathroomList = () => {
  const [bathrooms, setBathrooms] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch data from the Firebase URL
    fetch('https://list-wc-default-rtdb.asia-southeast1.firebasedatabase.app/list-wc.json')
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is an array of bathrooms
        setBathrooms(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Daftar Kamar Mandi</Text>
      <FlatList
        data={bathrooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('BathroomDetail', { bathroom: item })}
          >
            <View style={styles.bathroomItem}>
              <Text style={styles.bathroomName}>{item.name}</Text>
              <Text>Lokasi: {item.street}, {item.city}, {item.state}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  bathroomItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  bathroomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BathroomList;
