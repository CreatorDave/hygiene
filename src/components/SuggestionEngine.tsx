import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useProfile } from '../context/ProfileContext';
import { getHighFiberProducts, getLowSugarProducts, getOmega3Products, Product } from '../services/OpenFoodFactsApi';
import ProductList from './ProductList';

interface SuggestionEngineProps {
  onAdd: (product: Product) => void;
  addedIds: Set<string>;
}

const SuggestionEngine: React.FC<SuggestionEngineProps> = ({ onAdd, addedIds }) => {
  const { profile, filterProducts } = useProfile();
  const [suggestions, setSuggestions] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const categories = [];
    if (profile.highFiber) {
      categories.push({ key: 'High Fiber Picks', fetchFn: getHighFiberProducts });
    }
    if (profile.lowSugar) {
      categories.push({ key: 'Low Sugar Options', fetchFn: getLowSugarProducts });
    }
    if (profile.omega3) {
      categories.push({ key: 'Omega-3 Rich Foods', fetchFn: getOmega3Products });
    }

    if (categories.length === 0) {
      setSuggestions({});
      return;
    }

    setLoading(true);
    Promise.all(categories.map(cat => cat.fetchFn()))
      .then(results => {
        const newSuggestions: Record<string, Product[]> = {};
        results.forEach((prodList, index) => {
          const categoryName = categories[index].key;
          newSuggestions[categoryName] = filterProducts(prodList);
        });
        setSuggestions(newSuggestions);
      })
      .finally(() => setLoading(false));
  }, [profile.highFiber, profile.lowSugar, profile.omega3, filterProducts]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (Object.keys(suggestions).length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Select a health goal to see personalized recommendations
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Suggestions for You
      </Typography>
      {Object.entries(suggestions).map(([category, products]) => (
        products.length > 0 && (
          <Box key={category} sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              {category}
            </Typography>
            <ProductList
              products={products}
              onAdd={onAdd}
              addedIds={addedIds}
            />
          </Box>
        )
      ))}
    </Box>
  );
};

export default SuggestionEngine; 