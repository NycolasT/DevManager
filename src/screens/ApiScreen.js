import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ApiScreen = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchNews();
  }, []);

  // ---Requisição HTTP ---
  // Utilizamos o 'axios' para fazer um GET (buscar dados) na API do Dev.to.
  // O 'async/await' serve para esperar a internet responder antes de continuar.
  const fetchNews = async () => {
    try {
      const response = await axios.get('https://dev.to/api/articles?tag=reactnative&top=10');
      setNews(response.data);
    } catch (error) {
      console.error("Erro na API:", error);
    } finally {
      setLoading(false); // Desativa o loading independente de sucesso ou erro
    }
  };

  const openChatWithNews = (article) => {
    navigation.navigate('Home', { 
      screen: 'Chat',
      params: { articleContext: article }
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.9} onPress={() => openChatWithNews(item)}>
      <View style={styles.pixelCard}>
        {/* Imagem com borda grossa */}
        <Image 
          source={{ uri: item.cover_image || 'https://via.placeholder.com/400x200' }} 
          style={styles.image} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.tag}>{`<${item.tag_list[0]} />`}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text numberOfLines={2} style={styles.description}> -- {item.description}</Text>
          <Text style={styles.author}>Author: {item.user.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text style={styles.loadingText}>Fetching data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Dev.to News_Feed</Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1117', paddingTop: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0d1117' },
  loadingText: { color: '#00ff00', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', marginTop: 10 },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginLeft: 15, 
    color: '#fff', 
    marginBottom: 15,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    textDecorationLine: 'underline'
  },
  pixelCard: { 
    backgroundColor: '#161b22', 
    marginHorizontal: 15, 
    marginBottom: 20, 
    borderWidth: 2,
    borderColor: '#30363d',
    // Sombra "retro" deslocada
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  image: { width: '100%', height: 150, borderBottomWidth: 2, borderColor: '#30363d' },
  textContainer: { padding: 15 },
  tag: { color: '#ff7b72', fontWeight: 'bold', fontSize: 12, marginBottom: 5, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#c9d1d9', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  description: { fontSize: 14, color: '#8b949e', marginBottom: 10, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  author: { fontSize: 12, color: '#58a6ff', textAlign: 'right', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
});

export default ApiScreen;