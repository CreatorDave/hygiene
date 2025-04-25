import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Profile: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        <Typography variant="body1">
          Profile information will be displayed here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Profile;

 