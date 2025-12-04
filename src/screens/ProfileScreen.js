import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import Animated, { BounceIn } from 'react-native-reanimated'; 
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: false }),
});

const ProfileScreen = () => {
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    if (event.type === 'set') agendarParaHorario(currentDate);
  };

  // ---Notificações ---
  // Utilizamos o expo-notifications para agendar alertas locais.
  // Não precisa de servidor externo, o próprio celular gerencia o tempo.
  const agendarParaHorario = async (triggerDate) => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Erro', 'Permissão negada!');
      return;
    }
    const now = new Date();
    if (triggerDate <= now) triggerDate.setDate(triggerDate.getDate() + 1);
    const segundosAteLa = (triggerDate.getTime() - now.getTime()) / 1000;

    await Notifications.scheduleNotificationAsync({
      content: { title: "⏰ SYSTEM ALERT", body: `Task Reminder: ${triggerDate.getHours()}:${triggerDate.getMinutes()}` },
      trigger: { seconds: segundosAteLa },
    });
    Alert.alert('Agendado', `Timer definido.`);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1, 1], quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) return;
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, aspect: [1, 1], quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User_Config</Text>
      
      {/* Área da Foto: Borda Quadrada e Grossa */}
      <View style={styles.pixelFrame}>
        {image ? (
          <Animated.Image 
            entering={BounceIn.duration(1000)} 
            source={{ uri: image }} 
            style={styles.image} 
          />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="person-circle-outline" size={80} color="#30363d" />
            <Text style={{color: '#30363d', fontSize: 10}}>NO_IMAGE</Text>
          </View>
        )}
      </View>
      <Text style={styles.label}>ID: DevManager_01</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.btnPixel} onPress={pickImage}>
          <Ionicons name="images" size={16} color="#000" />
          <Text style={styles.btnText}>LOAD_IMG</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnPixel, {backgroundColor: '#58a6ff'}]} onPress={openCamera}>
          <Ionicons name="camera" size={16} color="#000" />
          <Text style={styles.btnText}>CAM_INIT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>[ Cron Jobs / Alerts ]</Text>
      
      <TouchableOpacity style={styles.btnLargePixel} onPress={() => setShowPicker(true)}>
        <Ionicons name="time" size={24} color="#000" />
        <Text style={styles.btnTextLarge}>SET_REMINDER</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker" value={date} mode="time" is24Hour={true} display="default" onChange={onChangeTime}
        />
      )}

      <Text style={styles.info}>
        -- Modules: ImagePicker, Reanimated, Notifications.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 20, backgroundColor: '#0d1117' },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    borderBottomWidth: 2, borderBottomColor: '#00ff00'
  },
  pixelFrame: {
    marginBottom: 15,
    borderWidth: 4,
    borderColor: '#30363d',
    padding: 5,
    backgroundColor: '#161b22'
  },
  image: { width: 140, height: 140, borderRadius: 0 }, // Quadrado
  placeholder: { width: 140, height: 140, backgroundColor: '#0d1117', alignItems: 'center', justifyContent: 'center' },
  
  label: {
    fontSize: 16, color: '#00ff00', marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  row: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  
  btnPixel: {
    flexDirection: 'row', backgroundColor: '#fff', padding: 10,
    borderWidth: 2, borderColor: '#30363d', alignItems: 'center', gap: 5,
    // Sombra Pixel
    shadowColor: "#fff", shadowOffset: { width: 3, height: 3 }, shadowOpacity: 0.5, shadowRadius: 0,
  },
  btnText: { fontWeight: 'bold', fontSize: 12, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  
  divider: { width: '100%', height: 2, backgroundColor: '#30363d', marginVertical: 20, borderStyle: 'dashed', borderRadius: 1 },
  
  sectionTitle: {
    fontSize: 14, fontWeight: 'bold', marginBottom: 15, color: '#8b949e',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  
  btnLargePixel: {
    flexDirection: 'row', backgroundColor: '#ff9800', padding: 15, width: '100%',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#fff',
    shadowColor: "#ff9800", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.8, shadowRadius: 0,
  },
  btnTextLarge: {
    color: '#000', fontSize: 16, fontWeight: 'bold', marginLeft: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  info: {
    fontSize: 10, color: '#484f58', textAlign: 'center', marginTop: 40,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  }
});

export default ProfileScreen;