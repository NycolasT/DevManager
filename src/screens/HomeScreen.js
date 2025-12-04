import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { initDB, addTarefa, getTarefas, deleteTarefa, toggleTarefa } from '../services/db';
import TaskItem from '../components/TaskItem';

const HomeScreen = ({ navigation }) => {
  const [tarefa, setTarefa] = useState('');
  const [listaTarefas, setListaTarefas] = useState([]);

  // ---useEffect ---
  // O useEffect roda automaticamente quando a tela abre.
  // Aqui ele inicializa o banco de dados (initDB) e busca os dados salvos.
  useEffect(() => {
    try {
      initDB(); 
      carregarDados();
    } catch (e) {
      console.log("Erro no banco:", e);
    }
  }, []);

  // ---CRUD (Create, Read, Update, Delete) ---
  // Esta função "Lê" (Read) os dados do SQLite e atualiza o estado da tela.
  const carregarDados = () => {
    const dados = getTarefas();
    setListaTarefas(dados);
  };

  const handleAddTarefa = () => {
    if (tarefa.trim() === '') {
      Alert.alert('Erro', 'O comando não pode estar vazio.');
      return;
    }
    addTarefa(tarefa); // Create
    setTarefa('');
    carregarDados();
  };

  const handleDeletar = (id) => {
    deleteTarefa(id); // Delete
    carregarDados();
  };

  const handleToggle = (id, status) => {
    toggleTarefa(id, status); // Update
    carregarDados();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{"< DevManager />"}</Text>
      <Text style={styles.subHeader}>System Status: Online</Text>
      
      {/* Input estilo Console */}
      <View style={styles.inputContainer}>
        <Text style={styles.prompt}>{">_"}</Text>
        <TextInput 
          style={styles.input}
          placeholder="Digite nova task..."
          placeholderTextColor="#666"
          value={tarefa}
          onChangeText={setTarefa}
        />
        <TouchableOpacity style={styles.btnPixel} onPress={handleAddTarefa}>
          <Text style={styles.btnText}>EXEC</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={listaTarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem 
            item={item} 
            onDelete={handleDeletar} 
            onToggle={handleToggle}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}> --Nenhuma tarefa encontrada no log.</Text>
        }
      />
      
      <TouchableOpacity 
        style={[styles.btnPixel, { marginTop: 15, backgroundColor: '#6200ea', borderColor: '#fff' }]} 
        onPress={() => navigation.navigate('Chat')}
      >
        <Text style={[styles.btnText, {color: '#fff'}]}>ABRIR CHAT TERMINAL</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0d1117', // Fundo escuro estilo GitHub Dark
  },
  headerTitle: {
    fontSize: 24,
    color: '#00ff00', // Verde Matrix
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', // Fonte estilo código
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  subHeader: {
    fontSize: 12,
    color: '#8b949e',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#161b22',
    borderWidth: 2,
    borderColor: '#30363d',
    paddingHorizontal: 10,
  },
  prompt: {
    color: '#00ff00',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    padding: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  btnPixel: {
    backgroundColor: '#2ea44f',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#000',
    // Sombra "dura" para efeito pixel/retro
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0, 
    elevation: 0,
    activeOpacity: 0.7
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 12,
  },
  emptyText: {
    color: '#8b949e',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontStyle: 'italic',
  }
});

export default HomeScreen;