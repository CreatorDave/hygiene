import React from 'react';
import { Box, Typography } from '@mui/material';
import { Product } from '../services/OpenFoodFactsApi';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onAdd?: (product: Product) => void;
  onRemove?: (product: Product) => void;
  addedIds?: Set<string>;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAdd,
  onRemove,
  addedIds = new Set()
}) => {
  if (products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          No products found
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {products.map(product => (
        <ProductCard
          key={product.code}
          product={product}
          onAdd={onAdd}
          onRemove={onRemove}
          isAdded={addedIds.has(product.code)}
        />
      ))}
    </Box>
  );
};

export default ProductList; 