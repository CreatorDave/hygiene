import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';

// Import web polyfills
import './src/utils/webPolyfills';

// Import screens
import ScannerScreen from './src/screens/ScannerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Scanner" 
            component={ScannerScreen}
            options={{
              title: 'Scan Food Item',
              headerStyle: {
                backgroundColor: Platform.OS === 'web' ? '#0A0A0A' : '#000',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
} 