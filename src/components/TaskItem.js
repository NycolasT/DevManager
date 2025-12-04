import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//Componentização
// Este componente representa UMA única linha na lista de tarefas.
//Apenas mostra dados e cahma funções que o pai mandou.
const TaskItem = ({ item, onDelete, onToggle }) => {
  return (
    <View style={styles.container}>
      
      {/* Área clicável da tarefa (Checkbox + Texto) */}
      <TouchableOpacity onPress={() => onToggle(item.id, item.concluido)} style={styles.textContainer}>
        {/* Checkbox estilo Terminal: [ ] ou [X] */}
        <Text style={[styles.checkbox, item.concluido ? styles.checkDone : styles.checkTodo]}>
          {item.concluido ? "[X]" : "[ ]"}
        </Text>
        
        <Text style={[styles.text, item.concluido && styles.riscado]}>
          {item.titulo}
        </Text>
      </TouchableOpacity>
      
      {/* Botão de Deletar */}
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
        <Ionicons name="trash-outline" size={18} color="#ff7b72" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#161b22', // Fundo estilo GitHub Dark
    padding: 12,
    borderWidth: 1,
    borderColor: '#30363d', // Borda cinza sutil
    marginBottom: 8, // Espaço entre itens
    alignItems: 'center',
    justifyContent: 'space-between',
    // Sombra "Dura" (Pixel art style) - sem blur
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0, 
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Ocupa todo o espaço disponível
  },
  checkbox: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', // Fonte de código
    fontWeight: 'bold',
    marginRight: 10,
  },
  checkTodo: {
    color: '#00ff00', // Verde Matrix para pendente
  },
  checkDone: {
    color: '#8b949e', // Cinza apagado para feito
  },
  text: {
    fontSize: 14,
    color: '#c9d1d9', // Texto quase branco
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  riscado: {
    textDecorationLine: 'line-through',
    color: '#8b949e', // Cor de comentário de código
    fontStyle: 'italic',
  },
  deleteBtn: {
    padding: 5,
    borderLeftWidth: 1,
    borderLeftColor: '#30363d',
    paddingLeft: 10,
  }
});

export default TaskItem;