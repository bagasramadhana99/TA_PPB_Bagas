// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // Panggil fungsi onFinish setelah beberapa detik
    }, 3000); // Tampilkan splash screen selama 2 detik

    return () => clearTimeout(timer); // Bersihkan timer
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/237px-Skibidi_toilet_screenshot.webp.png' }} // Menggunakan URL gambar
        style={styles.image} // Tambahkan style untuk gambar
        resizeMode="contain" // Menyesuaikan ukuran gambar agar proporsional
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34',
  },
  image: {
    width: '80%', // Ubah ukuran sesuai kebutuhan
    height: '80%', // Ubah ukuran sesuai kebutuhan
  },
});

export default SplashScreen;

