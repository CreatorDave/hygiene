import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { FormGroup, FormControlLabel, Checkbox, Paper, Typography } from '@mui/material';

const ProfileFilters: React.FC = () => {
  const { profile, togglePreference } = useProfile();

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Profile Preferences
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom>
        Dietary Restrictions
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={profile.vegetarian}
              onChange={() => togglePreference('vegetarian')}
            />
          }
          label="Vegetarian"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={profile.vegan}
              onChange={() => togglePreference('vegan')}
            />
          }
          label="Vegan"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={profile.glutenFree}
              onChange={() => togglePreference('glutenFree')}
            />
          }
          label="Gluten-Free"
        />
      </FormGroup>

      <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
        Health Goals
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={profile.highFiber}
              onChange={() => togglePreference('highFiber')}
            />
          }
          label="Increase Fiber"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={profile.lowSugar}
              onChange={() => togglePreference('lowSugar')}
            />
          }
          label="Reduce Sugar"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={profile.omega3}
              onChange={() => togglePreference('omega3')}
            />
          }
          label="Omega-3 Focus"
        />
      </FormGroup>
    </Paper>
  );
};

export default ProfileFilters; 