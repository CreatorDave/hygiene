import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Button,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Welcome, {user.name}!
          </Typography>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea onClick={() => navigate('/profile')}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Profile
                  </Typography>
                  <Typography color="text.secondary">
                    Manage your personal information and preferences
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea onClick={() => navigate('/health-tracker')}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Health Tracker
                  </Typography>
                  <Typography color="text.secondary">
                    Track your health issues and symptoms
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea onClick={() => navigate('/shopping-list')}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Shopping List
                  </Typography>
                  <Typography color="text.secondary">
                    Manage your shopping lists and items
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea onClick={() => navigate('/scanner')}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Barcode Scanner
                  </Typography>
                  <Typography color="text.secondary">
                    Scan product barcodes to get health information
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home; 