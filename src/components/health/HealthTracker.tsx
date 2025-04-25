import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const HealthTracker: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Health Tracker
        </Typography>
        <Typography variant="body1">
          Health tracking information will be displayed here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default HealthTracker; 