import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { getFoodByBarcode } from '../services/foodService';
import { FoodScoringService, HealthScore } from '../services/foodScoringService';
import { Food } from '../types/food';

const ScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [foodData, setFoodData] = useState<Food | null>(null);
  const [healthScore, setHealthScore] = useState<HealthScore | null>(null);
  const [alternatives, setAlternatives] = useState<Array<{name: string, healthScore: HealthScore, reason: string}>>([]);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: { type: string, data: string }) => {
    if (scanned) return;
    
    setScanned(true);
    setLoading(true);
    setError(null);

    try {
      const food = await getFoodByBarcode(data);
      if (!food) {
        setError('Product not found in database');
        return;
      }

      setFoodData(food);
      
      // Calculate health scores using the functional medicine approach
      const scores = FoodScoringService.calculateHealthScores(food);
      setHealthScore(scores);

      // Get alternative suggestions
      const suggestions = FoodScoringService.getAlternativeSuggestions(food);
      setAlternatives(suggestions);

    } catch (err) {
      setError('Failed to scan. Please try again.');
      console.error('Scan error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderScoreRows = (healthScore: HealthScore) => {
    const scores = [
      { label: 'Overall Score', value: healthScore.overall },
      { label: 'Inflammation Impact', value: healthScore.inflammation },
      { label: 'Gut Health Impact', value: healthScore.gutHealth },
      { label: 'Nutrient Density', value: healthScore.nutrientDensity },
      { label: 'Processing Level', value: healthScore.processing }
    ];

    return scores.map((score, index) => (
      <View key={index} style={styles.scoreRow}>
        <Text style={styles.scoreLabel}>{score.label}:</Text>
        <View style={styles.scoreValueContainer}>
          <Text style={[
            styles.scoreValue,
            { 
              color: getScoreColor(score.value),
              backgroundColor: getScoreBackgroundColor(score.value)
            }
          ]}>
            {score.value}/100
          </Text>
        </View>
      </View>
    ));
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No access to camera</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => BarCodeScanner.requestPermissionsAsync()}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.scanner]}
      >
        <View style={styles.scannerOverlay}>
          <View style={styles.scannerFrame}>
            <View style={styles.scannerLine} />
          </View>
          <Text style={styles.scannerText}>Position barcode within frame</Text>
        </View>
      </BarCodeScanner>
      
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Analyzing product...</Text>
        </View>
      )}

      {error && (
        <View style={styles.overlay}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setScanned(false);
              setError(null);
            }}
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      )}

      {scanned && !loading && !error && foodData && healthScore && (
        <View style={styles.resultContainer}>
          <Text style={styles.productName}>{foodData.name}</Text>
          {renderScoreRows(healthScore)}
          {alternatives.length > 0 && (
            <View style={styles.alternativesContainer}>
              <Text style={styles.alternativesTitle}>Healthier Alternatives:</Text>
              {alternatives.map((alt, index) => (
                <View key={index} style={styles.alternativeItem}>
                  <Text style={styles.alternativeName}>{alt.name}</Text>
                  <Text style={styles.alternativeReason}>{alt.reason}</Text>
                </View>
              ))}
            </View>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setScanned(false);
              setFoodData(null);
              setHealthScore(null);
              setAlternatives([]);
            }}
          >
            <Text style={styles.buttonText}>Scan Another</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scanner: {
    flex: 1,
  },
  scannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: 280,
    height: 280,
    borderWidth: 2,
    borderColor: '#4CAF50',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  scannerLine: {
    height: 2,
    backgroundColor: '#4CAF50',
    width: '100%',
  },
  scannerText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  scoreValueContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  alternativesContainer: {
    marginTop: 20,
  },
  alternativesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  alternativeItem: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  alternativeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  alternativeReason: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

const getScoreColor = (score: number): string => {
  if (score >= 80) return '#4CAF50';
  if (score >= 60) return '#8BC34A';
  if (score >= 40) return '#FFC107';
  if (score >= 20) return '#FF9800';
  return '#F44336';
};

const getScoreBackgroundColor = (score: number): string => {
  if (score >= 80) return '#E8F5E9';
  if (score >= 60) return '#F1F8E9';
  if (score >= 40) return '#FFF8E1';
  if (score >= 20) return '#FFF3E0';
  return '#FFEBEE';
};

export default ScannerScreen; 