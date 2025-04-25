import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FoodItem } from '../types';

const ResultsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { foodItem, personalScore } = route.params as {
    foodItem: FoodItem;
    personalScore: number;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#2ecc71';
    if (score >= 60) return '#f1c40f';
    if (score >= 40) return '#e67e22';
    return '#e74c3c';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent choice!';
    if (score >= 60) return 'Good choice';
    if (score >= 40) return 'Moderate choice';
    return 'Poor choice';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.foodName}>{foodItem.name}</Text>
        <View style={[styles.scoreContainer, { backgroundColor: getScoreColor(personalScore) }]}>
          <Text style={styles.score}>{Math.round(personalScore)}</Text>
        </View>
        <Text style={styles.scoreMessage}>{getScoreMessage(personalScore)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nutritional Information</Text>
        <View style={styles.nutritionGrid}>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{foodItem.nutritionalInfo.calories}</Text>
            <Text style={styles.nutritionLabel}>Calories</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{foodItem.nutritionalInfo.protein}g</Text>
            <Text style={styles.nutritionLabel}>Protein</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{foodItem.nutritionalInfo.carbs}g</Text>
            <Text style={styles.nutritionLabel}>Carbs</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{foodItem.nutritionalInfo.fat}g</Text>
            <Text style={styles.nutritionLabel}>Fat</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Text style={styles.ingredientsText}>{foodItem.ingredients.join(', ')}</Text>
      </View>

      {foodItem.additives && foodItem.additives.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additives</Text>
          <View style={styles.additivesContainer}>
            {foodItem.additives.map((additive, index) => (
              <View key={index} style={styles.additiveItem}>
                <Text style={styles.additiveText}>{additive}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Scan Another Item</Text>
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
    backgroundColor: '#f8f9fa',
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  scoreContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreMessage: {
    fontSize: 18,
    color: '#2c3e50',
    marginTop: 5,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    width: '48%',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 5,
  },
  ingredientsText: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
  },
  additivesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  additiveItem: {
    backgroundColor: '#e9ecef',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  additiveText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResultsScreen; 