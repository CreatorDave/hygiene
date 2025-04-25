import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, Grid, FormControl, InputLabel } from '@mui/material';

interface SearchControlsProps {
  onSearch: (query: string, labelFilter: string) => void;
}

const SearchControls: React.FC<SearchControlsProps> = ({ onSearch }) => {
  const [term, setTerm] = useState('');
  const [labelFilter, setLabelFilter] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(term.trim(), labelFilter);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Search Products"
            variant="outlined"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Enter product name..."
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Filter</InputLabel>
            <Select
              value={labelFilter}
              label="Filter"
              onChange={(e) => setLabelFilter(e.target.value)}
            >
              <MenuItem value="all">All Products</MenuItem>
              <MenuItem value="vegan">Vegan</MenuItem>
              <MenuItem value="vegetarian">Vegetarian</MenuItem>
              <MenuItem value="organic">Organic</MenuItem>
              <MenuItem value="gluten-free">Gluten-Free</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ height: '56px' }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchControls; 