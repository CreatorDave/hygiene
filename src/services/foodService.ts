import axios from 'axios';
import { Food } from '../types/food';

const API_URL = 'https://world.openfoodfacts.org/api/v0/product';

interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodItem {
  name: string;
  brand: string;
  category: string;
  nutrition?: NutritionInfo;
}

// Mock data for testing
const mockFoodDatabase: { [key: string]: Food } = {
  '737628064502': {
    id: '1',
    name: 'Organic Quinoa',
    barcode: '737628064502',
    categories: ['grains', 'organic', 'whole foods'],
    ingredients: ['organic quinoa'],
    nutritionalInfo: {
      calories: 120,
      protein: 4,
      carbs: 21,
      fat: 2,
      sugar: 0,
      sodium: 10
    }
  },
  '011110038364': {
    id: '2',
    name: 'Processed Snack Chips',
    barcode: '011110038364',
    categories: ['snacks', 'processed'],
    ingredients: ['corn', 'vegetable oil', 'salt', 'artificial flavors'],
    additives: ['MSG', 'artificial color'],
    nutritionalInfo: {
      calories: 160,
      protein: 2,
      carbs: 15,
      fat: 10,
      sugar: 1,
      sodium: 180
    }
  }
};

export const getFoodByBarcode = async (barcode: string): Promise<FoodItem> => {
  try {
    const response = await axios.get(`${API_URL}/${barcode}.json`);
    const product = response.data.product;

    if (!product) {
      throw new Error('Product not found');
    }

    return {
      name: product.product_name || 'Unknown Product',
      brand: product.brands || 'Unknown Brand',
      category: product.categories || 'Uncategorized',
      nutrition: product.nutriments ? {
        calories: product.nutriments.energy_kcal_100g || 0,
        protein: product.nutriments.proteins_100g || 0,
        carbs: product.nutriments.carbohydrates_100g || 0,
        fat: product.nutriments.fat_100g || 0,
      } : undefined,
    };
  } catch (error) {
    console.error('Error fetching food data:', error);
    throw new Error('Failed to fetch food data');
  }
};

export const searchFoods = async (query: string): Promise<Food[]> => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching foods:', error);
    return [];
  }
};

const calculateBaseScore = (foodData: any): number => {
  let score = 100;

  // Deduct points for additives
  if (foodData.additives_tags?.length) {
    score -= foodData.additives_tags.length * 2;
  }

  // Deduct points for high sugar content
  if (foodData.nutriments?.sugars_100g > 10) {
    score -= 10;
  }

  // Deduct points for high sodium content
  if (foodData.nutriments?.sodium_100g > 0.5) {
    score -= 10;
  }

  // Add points for high protein content
  if (foodData.nutriments?.proteins_100g > 10) {
    score += 5;
  }

  // Add points for high fiber content
  if (foodData.nutriments?.fiber_100g > 5) {
    score += 5;
  }

  // Consider Nutri-Score if available
  if (foodData.nutrition_grades) {
    switch (foodData.nutrition_grades.toUpperCase()) {
      case 'A':
        score += 10;
        break;
      case 'B':
        score += 5;
        break;
      case 'C':
        score -= 5;
        break;
      case 'D':
        score -= 10;
        break;
      case 'E':
        score -= 20;
        break;
    }
  }

  return Math.max(0, Math.min(100, score));
}; 