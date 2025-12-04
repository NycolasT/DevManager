import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';

const tokenCache = {
  async getToken(key) {
    try { return SecureStore.getItemAsync(key); } catch (err) { return null; }
  },
  async saveToken(key, value) {
    try { return SecureStore.setItemAsync(key, value); } catch (err) { return; }
  },
};

const CLERK_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function App() {
  return (
    
    <ClerkProvider publishableKey={CLERK_KEY} tokenCache={tokenCache}>
      <NavigationContainer>
        {}
        <StatusBar style="auto" />
        <AppNavigator /> 
      </NavigationContainer>
    </ClerkProvider>
  );
}