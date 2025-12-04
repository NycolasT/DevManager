import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

// --- CONFIGURAÇÃO ---
const GEMINI_API_KEY = "chave; 
const MODEL_NAME = "gemini-flash-latest"; 

const ChatScreen = ({ route }) => {
  const { articleContext } = route.params || {}; 
  
  const [mensagem, setMensagem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    if (articleContext) {
      setMensagens([{ 
          id: '0', 
          text: `SYS_MSG: Contexto carregado: "${articleContext.title}". Aguardando input...`, 
          sender: 'bot' 
      }]);
    } else {
      setMensagens([{ id: '0', text: 'SYS_MSG: IA conectada. Digite sua dúvida.', sender: 'bot' }]);
    }
  }, [articleContext]);

  // ---Integração com IA ---
  // Enviamos o prompt (pergunta + contexto) para o Google Gemini via POST.
  // A resposta vem em formato JSON, que nós "desempacotamos" para pegar o texto.
  const callGeminiAI = async (userMessage) => {
    try {
      const prompt = `Aja como um sênior dev. Usuário disse: "${userMessage}". ${articleContext ? `Contexto: ${articleContext.title}` : ''}. Responda curto e técnico.`;
      
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;
      const response = await axios.post(url, { contents: [{ parts: [{ text: prompt }] }] });

      if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        return response.data.candidates[0].content.parts[0].text;
      }
      return null;
    } catch (error) {
      console.log(`Erro API (${MODEL_NAME}):`, error.message);
      return null; 
    }
  };

  const generateFakeResponse = (userMsg) => {
    return `[SIMULATION_MODE]: A API retornou erro de cota. Mas sobre "${userMsg}", no React Native usamos Hooks para isso.`;
  };

  const handleSend = async () => {
    if (mensagem.trim() === '') return;

    const userMsg = mensagem;
    setMensagem('');
    
    setMensagens(prev => [...prev, { id: Date.now().toString(), text: userMsg, sender: 'user' }]);
    setIsLoading(true);

    let botResponse = '';
    if (GEMINI_API_KEY) {
      botResponse = await callGeminiAI(userMsg);
    }

    if (!botResponse) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      botResponse = generateFakeResponse(userMsg);
    }

    setMensagens(prev => [...prev, { id: Date.now().toString(), text: botResponse, sender: 'bot' }]);
    setIsLoading(false);
  };

  const renderItem = ({ item }) => {
    const isUser = item.sender === 'user';
    // Estilo diferente: Em vez de balão, parece log de terminal
    return (
      <View style={[styles.logLine, isUser ? styles.logUser : styles.logBot]}>
        <Text style={styles.logPrefix}>
          {isUser ? 'USER@DEV:~$ ' : 'AI@SYSTEM:~$ '}
        </Text>
        <Text style={styles.logText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={mensagens}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />
      
      {isLoading && <ActivityIndicator size="small" color="#00ff00" style={{marginLeft: 20}} />}

      <View style={styles.inputContainer}>
        <Text style={styles.prompt}>{">"}</Text>
        <TextInput
          style={styles.input}
          placeholder="Comando..."
          placeholderTextColor="#555"
          value={mensagem}
          onChangeText={setMensagem}
        />
        <TouchableOpacity onPress={handleSend} style={styles.btnSend}>
          <Ionicons name="return-down-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1117' },
  lista: { padding: 15, paddingBottom: 20 },
  
  // Estilos de Log
  logLine: { 
    marginBottom: 10, 
    padding: 10, 
    borderLeftWidth: 3, 
    backgroundColor: '#161b22',
  },
  logUser: { borderLeftColor: '#00ff00' }, // Verde para User
  logBot: { borderLeftColor: '#8250df' },  // Roxo para Bot
  
  logPrefix: {
    color: '#8b949e',
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 2
  },
  logText: {
    color: '#c9d1d9',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    lineHeight: 20
  },

  inputContainer: { 
    flexDirection: 'row', 
    padding: 10, 
    backgroundColor: '#161b22', 
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#30363d'
  },
  prompt: { color: '#00ff00', fontSize: 20, marginRight: 5, fontWeight: 'bold' },
  input: { 
    flex: 1, 
    color: '#fff', 
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    height: 40 
  },
  btnSend: { 
    backgroundColor: '#00ff00', 
    width: 40, 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff'
  },
});


export default ChatScreen;
