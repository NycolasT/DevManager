import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import ApiScreen from '../screens/ApiScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Importaremos as telas depois, por enquanto vamos criar placeholders
import { View, Text, Button } from 'react-native';

//Tela principal de Tarefas
import HomeScreen from '../screens/HomeScreen';



// --- Configuração das Navegações [cite: 19, 20, 21, 22] ---

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// 1. Stack Navigation (Fluxo interno)
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListaTarefas" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

// 2. Tab Navigation (Abas inferiores)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'list';
          else if (route.name === 'Notícias') iconName = 'globe';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Notícias" component={ApiScreen} />
    </Tab.Navigator>
  );
}

// 3. Drawer Navigation (Menu Lateral - Raiz)
export default function AppNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Principal" component={MainTabs} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}