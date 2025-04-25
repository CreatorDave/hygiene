import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Please sign in to view your profile</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Preferences</Text>
        
        {user.preferences.allergies.length > 0 && (
          <View style={styles.preferenceGroup}>
            <Text style={styles.preferenceTitle}>Allergies</Text>
            {user.preferences.allergies.map(allergy => (
              <Text key={allergy.id} style={styles.preferenceItem}>
                • {allergy.name}
              </Text>
            ))}
          </View>
        )}

        {user.preferences.sensitivities.length > 0 && (
          <View style={styles.preferenceGroup}>
            <Text style={styles.preferenceTitle}>Sensitivities</Text>
            {user.preferences.sensitivities.map(sensitivity => (
              <Text key={sensitivity.id} style={styles.preferenceItem}>
                • {sensitivity.name}
              </Text>
            ))}
          </View>
        )}

        {user.preferences.healthConditions.length > 0 && (
          <View style={styles.preferenceGroup}>
            <Text style={styles.preferenceTitle}>Health Conditions</Text>
            {user.preferences.healthConditions.map(condition => (
              <Text key={condition.id} style={styles.preferenceItem}>
                • {condition.name}
              </Text>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('Preferences')}
      >
        <Text style={styles.editButtonText}>Edit Preferences</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  preferenceGroup: {
    marginBottom: 20,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  preferenceItem: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 5,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 