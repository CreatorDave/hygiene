import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Severity } from '../types';

const PreferencesScreen = () => {
  const { user, updateUserPreferences } = useAuth();
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedSensitivities, setSelectedSensitivities] = useState<string[]>([]);
  const [selectedHealthConditions, setSelectedHealthConditions] = useState<string[]>([]);

  const commonAllergies = [
    'Peanuts',
    'Tree Nuts',
    'Milk',
    'Eggs',
    'Fish',
    'Shellfish',
    'Soy',
    'Wheat',
  ];

  const commonSensitivities = [
    'Gluten',
    'Lactose',
    'Caffeine',
    'Artificial Sweeteners',
    'MSG',
    'Sulfites',
    'Histamine',
  ];

  const commonHealthConditions = [
    'Diabetes',
    'High Blood Pressure',
    'Heart Disease',
    'Celiac Disease',
    'IBS',
    'Kidney Disease',
  ];

  const handleSavePreferences = async () => {
    if (!user) return;

    const preferences = {
      allergies: selectedAllergies.map(name => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        severity: Severity.CRITICAL,
      })),
      sensitivities: selectedSensitivities.map(name => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        severity: Severity.HIGH,
      })),
      healthConditions: selectedHealthConditions.map(name => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
      })),
      dietaryPreferences: [],
    };

    try {
      await updateUserPreferences(preferences);
      Alert.alert('Success', 'Your preferences have been saved');
    } catch (error) {
      Alert.alert('Error', 'Failed to save preferences');
    }
  };

  const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const renderSelectionList = (title: string, items: string[], selectedItems: string[], setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.itemsContainer}>
        {items.map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.item,
              selectedItems.includes(item) && styles.selectedItem,
            ]}
            onPress={() => toggleSelection(item, selectedItems, setSelectedItems)}
          >
            <Text
              style={[
                styles.itemText,
                selectedItems.includes(item) && styles.selectedItemText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Food Preferences</Text>
      <Text style={styles.subtitle}>
        Select the items you want to avoid or be cautious about
      </Text>

      {renderSelectionList('Allergies', commonAllergies, selectedAllergies, setSelectedAllergies)}
      {renderSelectionList('Sensitivities', commonSensitivities, selectedSensitivities, setSelectedSensitivities)}
      {renderSelectionList('Health Conditions', commonHealthConditions, selectedHealthConditions, setSelectedHealthConditions)}

      <TouchableOpacity style={styles.saveButton} onPress={handleSavePreferences}>
        <Text style={styles.saveButtonText}>Save Preferences</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedItem: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  itemText: {
    color: '#2c3e50',
  },
  selectedItemText: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PreferencesScreen; 