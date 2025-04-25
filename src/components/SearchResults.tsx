import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useProfile } from '../context/ProfileContext';
import { Product } from '../services/OpenFoodFactsApi';
import ProductList from './ProductList';

interface SearchResultsProps {
  query: string;
  results: Product[];
  labelFilter: string;
  onAdd: (product: Product) => void;
  addedIds: Set<string>;
  loading?: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  results,
  labelFilter,
  onAdd,
  addedIds,
  loading = false
}) => {
  const { filterProducts } = useProfile();

  let filteredResults = filterProducts(results);
  
  if (labelFilter && labelFilter !== 'all') {
    filteredResults = filteredResults.filter(product => {
      const tags = product.ingredients_analysis_tags || [];
      const labels = product.labels_tags || [];
      
      switch (labelFilter) {
        case 'vegan':
          return tags.includes('en:vegan');
        case 'vegetarian':
          return tags.includes('en:vegetarian') || tags.includes('en:vegan');
        case 'organic':
          return labels.includes('en:organic');
        case 'gluten-free':
          const noGlutenAllergen = !(product.allergens_tags || []).some(tag => tag.includes('gluten'));
          const labeledGF = labels.includes('en:gluten-free');
          return labeledGF || noGlutenAllergen;
        default:
          return true;
      }
    });
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {query ? `Search Results for "${query}"` : 'Search Results'}
      </Typography>
      <ProductList
        products={filteredResults}
        onAdd={onAdd}
        addedIds={addedIds}
      />
    </Box>
  );
};

export default SearchResults; 