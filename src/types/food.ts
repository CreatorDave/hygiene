export interface Food {
  id: string;
  name: string;
  barcode: string;
  ingredients: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
  };
  additives: string[];
  allergens: string[];
}

export interface HealthScore {
  overall: number;
  inflammation: number;
  gutHealth: number;
  nutrientDensity: number;
  processing: number;
} 