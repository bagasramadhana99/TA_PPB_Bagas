import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const BathroomDetail = ({ route }) => {
  const { bathroom } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{bathroom.name}</Text>
      <Text>Lokasi: {bathroom.street}, {bathroom.city}, {bathroom.state}</Text>
      <Text>Unisex: {bathroom.unisex ? 'Ya' : 'Tidak'}</Text>
      <Text>Aksesibilitas: {bathroom.accessible ? 'Ya' : 'Tidak'}</Text>
      <Text>Petunjuk: {bathroom.directions}</Text>
      <Text>Koordinat: ({bathroom.latitude}, {bathroom.longitude})</Text>

      {/* Menambahkan bingkai di sekitar MapView */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: bathroom.latitude,
            longitude: bathroom.longitude,
            latitudeDelta: 0.01,  // Menentukan seberapa luas area peta
            longitudeDelta: 0.01,
          }}
        >
          {/* Menambahkan Marker pada lokasi bathroom */}
          <Marker
            coordinate={{
              latitude: bathroom.latitude,
              longitude: bathroom.longitude,
            }}
            title={bathroom.name}
            description={`Lokasi: ${bathroom.street}, ${bathroom.city}`}
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mapContainer: {
    borderWidth: 2,               // Ketebalan border
    borderColor: '#007AFF',      // Warna border
    borderRadius: 10,            // Sudut membulat
    overflow: 'hidden',           // Agar sudut membulat terlihat
    marginTop: 20,
  },
  map: {
    width: '100%',
    height: 300,  // Menentukan tinggi peta
  },
});

export default BathroomDetail;
