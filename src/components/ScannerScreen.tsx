import { useState } from 'react';
import { Box, Typography, Card, CardContent, LinearProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import BarcodeScanner from './BarcodeScanner';
import { getFoodByBarcode } from '../services/foodService';
import { FoodScoringService, HealthScore } from '../services/foodScoringService';
import { Food } from '../types/food';

const ScannerScreen = () => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scannedItem, setScannedItem] = useState<Food | null>(null);
  const [healthScore, setHealthScore] = useState<HealthScore | null>(null);
  const [alternatives, setAlternatives] = useState<Array<{name: string, healthScore: HealthScore, reason: string}>>([]);

  const handleScan = async (barcode: string) => {
    if (!isAuthenticated) {
      setError('Please log in to scan items');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const item = await getFoodByBarcode(barcode);
      setScannedItem(item);
      
      // Calculate health scores
      const scores = FoodScoringService.calculateHealthScores(item);
      setHealthScore(scores);

      // Get alternative suggestions
      const suggestions = FoodScoringService.getAlternativeSuggestions(item);
      setAlternatives(suggestions);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch item details');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          Please log in to use the scanner
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Barcode Scanner
      </Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <BarcodeScanner onScan={handleScan} onError={setError} />
        </CardContent>
      </Card>

      {isLoading && <LinearProgress />}

      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {scannedItem && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6">{scannedItem.name}</Typography>
            <Typography color="textSecondary">
              Brand: {scannedItem.brand}
            </Typography>
            <Typography color="textSecondary">
              Category: {scannedItem.category}
            </Typography>
            {scannedItem.nutrition && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Nutrition Information:</Typography>
                <Typography>Calories: {scannedItem.nutrition.calories}</Typography>
                <Typography>Protein: {scannedItem.nutrition.protein}g</Typography>
                <Typography>Carbs: {scannedItem.nutrition.carbs}g</Typography>
                <Typography>Fat: {scannedItem.nutrition.fat}g</Typography>
              </Box>
            )}

            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                {renderScoreCard('Overall Score', healthScore.overall)}
                {renderScoreCard('Inflammation Impact', healthScore.inflammation)}
                {renderScoreCard('Gut Health Impact', healthScore.gutHealth)}
              </Grid>
              <Grid item xs={12} md={6}>
                {renderScoreCard('Nutrient Density', healthScore.nutrientDensity)}
                {renderScoreCard('Processing Level', healthScore.processing)}
              </Grid>
            </Grid>

            {alternatives.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Healthier Alternatives:
                </Typography>
                {alternatives.map((alt, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle1">{alt.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {alt.reason}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ScannerScreen; 