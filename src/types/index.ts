export interface User {
  id: string;
  name: string;
  email: string;
  familyId?: string;
  profiles: Profile[];
}

export interface Profile {
  id: string;
  name: string;
  userId: string;
  diet: string[];
  allergies: string[];
  healthGoals: {
    brain: boolean;
    protein: boolean;
    energy: boolean;
    fiber: boolean;
  };
  organicOnly: boolean;
}

export interface ShoppingList {
  id: string;
  name: string;
  ownerId: string;
  familyId?: string;
  items: ListItem[];
  profileId?: string;
}

export interface ListItem {
  id: string;
  name: string;
  quantity: number;
  isPurchased: boolean;
  notes?: string;
}

export interface SuggestionItem {
  id: string;
  name: string;
  description: string;
  type: 'supplement' | 'food';
  affiliateLink: string;
  isOrganic: boolean;
  tags: string[];
}

export interface HealthIssue {
  key: string;
  name: string;
  category: string;
  overview: string;
  suggestions: SuggestionItem[];
}

export interface Family {
  id: string;
  name: string;
  adminId: string;
  memberIds: string[];
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: { name: string; email: string; password: string }) => Promise<void>;
}

export type UserPreferences = {
  allergies: Allergy[];
  sensitivities: Sensitivity[];
  healthConditions: HealthCondition[];
  dietaryPreferences: DietaryPreference[];
};

export type Allergy = {
  id: string;
  name: string;
  severity: Severity;
};

export type Sensitivity = {
  id: string;
  name: string;
  severity: Severity;
};

export type HealthCondition = {
  id: string;
  name: string;
  description?: string;
};

export type DietaryPreference = {
  id: string;
  name: string;
  type: 'avoid' | 'prefer';
  severity: Severity;
};

export enum Severity {
  LOW = 1,
  MODERATE = 2,
  HIGH = 3,
  CRITICAL = 4
}

export type FoodItem = {
  id: string;
  barcode: string;
  name: string;
  ingredients: string[];
  additives: string[];
  nutritionalInfo: NutritionalInfo;
  baseScore: number;
};

export type NutritionalInfo = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
};

export type FoodScore = {
  baseScore: number;
  personalScore: number;
  warnings: string[];
  recommendations: string[];
}; 