import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Chip, Box } from '@mui/material';
import { Product } from '../services/OpenFoodFactsApi';

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
  onRemove?: (product: Product) => void;
  isAdded?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd, onRemove, isAdded }) => {
  const {
    product_name,
    brands,
    nutrition_grades,
    ingredients_analysis_tags = [],
    labels_tags = [],
    allergens_tags = [],
    additives_n,
    image_small_url
  } = product;

  const displayName = brands ? `${brands} – ${product_name}` : product_name;
  const nutriScore = nutrition_grades ? nutrition_grades.toUpperCase() : 'N/A';

  const dietLabels = [];
  if (ingredients_analysis_tags.includes('en:vegan')) {
    dietLabels.push('Vegan');
  } else if (ingredients_analysis_tags.includes('en:vegetarian')) {
    dietLabels.push('Vegetarian');
  }
  if (labels_tags.includes('en:organic')) {
    dietLabels.push('Organic');
  }
  if (labels_tags.includes('en:gluten-free')) {
    dietLabels.push('Gluten-Free');
  }

  const allergensList = allergens_tags
    .filter(tag => tag.startsWith('en:'))
    .map(tag => tag.replace('en:', ''))
    .join(', ');

  return (
    <Card sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
        {image_small_url && (
          <CardMedia
            component="img"
            sx={{ width: { xs: '100%', sm: 150 }, height: { xs: 200, sm: 150 } }}
            image={image_small_url}
            alt={`${product_name} product`}
          />
        )}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            {displayName}
          </Typography>
          
          <Box sx={{ mb: 1 }}>
            <Chip
              label={`Nutri-Score: ${nutriScore}`}
              color="primary"
              size="small"
              sx={{ mr: 1 }}
            />
            {dietLabels.map(label => (
              <Chip
                key={label}
                label={label}
                size="small"
                sx={{ mr: 1, mt: 1 }}
              />
            ))}
          </Box>

          {allergensList && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Allergens: {allergensList}
            </Typography>
          )}
          
          {additives_n != null && additives_n > 0 && (
            <Typography variant="body2" color="text.secondary">
              Additives: {additives_n}
            </Typography>
          )}

          <Box sx={{ mt: 2 }}>
            {onAdd && !onRemove && (
              <Button
                variant="contained"
                onClick={() => onAdd(product)}
                disabled={isAdded}
                size="small"
              >
                {isAdded ? 'Added' : 'Add to List'}
              </Button>
            )}
            {onRemove && (
              <Button
                variant="outlined"
                onClick={() => onRemove(product)}
                size="small"
                color="error"
              >
                Remove
              </Button>
            )}
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ProductCard; 