import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../services/OpenFoodFactsApi';

interface Profile {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  highFiber: boolean;
  lowSugar: boolean;
  omega3: boolean;
}

interface ProfileContextType {
  profile: Profile;
  togglePreference: (key: keyof Profile) => void;
  filterProducts: (products: Product[]) => Product[];
}

const defaultProfile: Profile = {
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  highFiber: false,
  lowSugar: false,
  omega3: false
};

const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfile,
  togglePreference: () => {},
  filterProducts: (products) => products
});

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  const togglePreference = (key: keyof Profile) => {
    setProfile(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filterProducts = (products: Product[]): Product[] => {
    return products
      .filter(product => {
        const tags = product.ingredients_analysis_tags || [];
        const allergens = product.allergens_tags || [];

        if (profile.vegan && !tags.includes('en:vegan')) {
          return false;
        }
        if (profile.vegetarian && !tags.includes('en:vegetarian') && !tags.includes('en:vegan')) {
          return false;
        }
        if (profile.glutenFree) {
          const hasGluten = allergens.some(tag => tag.includes('gluten'));
          if (hasGluten) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const nutrA = a.nutriments || {};
        const nutrB = b.nutriments || {};
        const sugarA = nutrA.sugars_100g ?? Infinity;
        const sugarB = nutrB.sugars_100g ?? Infinity;
        const fiberA = nutrA.fiber_100g ?? 0;
        const fiberB = nutrB.fiber_100g ?? 0;

        if (profile.lowSugar && profile.highFiber) {
          const bySugar = sugarA - sugarB;
          if (bySugar !== 0) return bySugar;
          return fiberB - fiberA;
        }
        if (profile.lowSugar) {
          return sugarA - sugarB;
        }
        if (profile.highFiber) {
          return fiberB - fiberA;
        }
        return 0;
      });
  };

  return (
    <ProfileContext.Provider value={{ profile, togglePreference, filterProducts }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext); 