import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Product } from '../services/OpenFoodFactsApi';
import ProductList from './ProductList';

interface ShoppingListProps {
  items: Product[];
  onRemove: (product: Product) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ items, onRemove }) => {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Your Shopping List
      </Typography>
      {items.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Your shopping list is empty
          </Typography>
        </Box>
      ) : (
        <ProductList
          products={items}
          onRemove={onRemove}
        />
      )}
    </Paper>
  );
};

export default ShoppingList; 