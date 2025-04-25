import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ShoppingList: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Shopping List
        </Typography>
        <Typography variant="body1">
          Shopping list items will be displayed here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default ShoppingList; 