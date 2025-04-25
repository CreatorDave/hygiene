import { Food, HealthScore } from '../types/food';

export class FoodScoringService {
  static calculateHealthScores(food: Food): HealthScore {
    const scores = {
      overall: 0,
      inflammation: 0,
      gutHealth: 0,
      nutrientDensity: 0,
      processing: 0
    };

    // Calculate inflammation score
    scores.inflammation = this.calculateInflammationScore(food);

    // Calculate gut health score
    scores.gutHealth = this.calculateGutHealthScore(food);

    // Calculate nutrient density score
    scores.nutrientDensity = this.calculateNutrientDensityScore(food);

    // Calculate processing score
    scores.processing = this.calculateProcessingScore(food);

    // Calculate overall score
    scores.overall = Math.round(
      (scores.inflammation + scores.gutHealth + scores.nutrientDensity + scores.processing) / 4
    );

    return scores;
  }

  private static calculateInflammationScore(food: Food): number {
    let score = 100;

    // Deduct points for inflammatory ingredients
    const inflammatoryIngredients = ['sugar', 'high fructose corn syrup', 'vegetable oil', 'soybean oil'];
    food.ingredients.forEach(ingredient => {
      if (inflammatoryIngredients.some(i => ingredient.toLowerCase().includes(i))) {
        score -= 20;
      }
    });

    // Deduct points for high sugar content
    if (food.nutritionalInfo.sugar > 10) {
      score -= 15;
    }

    return Math.max(0, score);
  }

  private static calculateGutHealthScore(food: Food): number {
    let score = 100;

    // Add points for fiber
    if (food.nutritionalInfo.fiber > 5) {
      score += 20;
    }

    // Deduct points for artificial additives
    food.additives.forEach(() => {
      score -= 10;
    });

    return Math.max(0, Math.min(100, score));
  }

  private static calculateNutrientDensityScore(food: Food): number {
    let score = 100;

    // Calculate based on protein, fiber, and micronutrients
    const proteinScore = Math.min(100, food.nutritionalInfo.protein * 10);
    const fiberScore = Math.min(100, food.nutritionalInfo.fiber * 20);

    score = (proteinScore + fiberScore) / 2;

    return Math.max(0, Math.min(100, score));
  }

  private static calculateProcessingScore(food: Food): number {
    let score = 100;

    // Deduct points for each additive
    food.additives.forEach(() => {
      score -= 10;
    });

    // Deduct points for high sodium content
    if (food.nutritionalInfo.sodium > 500) {
      score -= 20;
    }

    return Math.max(0, score);
  }

  static getAlternativeSuggestions(food: Food): Array<{name: string, healthScore: HealthScore, reason: string}> {
    // This would typically call an API to get real suggestions
    // For now, return mock suggestions
    return [
      {
        name: "Organic " + food.name,
        healthScore: this.calculateHealthScores({
          ...food,
          additives: [],
          ingredients: food.ingredients.map(i => i.replace('conventional', 'organic'))
        }),
        reason: "Organic version with fewer additives"
      }
    ];
  }
} 