import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const HealthArticles = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const apiKey = 'ddb58197e12f49d38b35ffaae03146fd';

  useEffect(() => {
    const fetchHealthArticles = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${apiKey}`
        );

        if (response.data && response.data.articles.length > 0) {
          setArticles(response.data.articles);
        } else {
          Alert.alert('Info', 'Saat ini tidak ada artikel kesehatan yang tersedia.');
        }
      } catch (error) {
        console.error('Error fetching health articles:', error);
        Alert.alert('Error', 'Gagal mengambil artikel kesehatan. Coba lagi nanti.');
      }
    };

    fetchHealthArticles();
  }, []);

  const renderArticle = ({ item }) => (
    <TouchableOpacity
      style={styles.articleContainer}
      onPress={() => navigation.navigate('ArticleDetail', { article: item })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.source}>Sumber: {item.source.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {articles.length > 0 ? (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderArticle}
        />
      ) : (
        <Text style={styles.noArticles}>Saat ini tidak ada artikel yang tersedia.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  articleContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  source: {
    fontSize: 12,
    color: '#666',
  },
  noArticles: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});

export default HealthArticles;
