import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hygiene App
          </Typography>
          {isAuthenticated ? (
            <>
              <Button color="inherit" onClick={() => navigate('/profile')}>
                Profile
              </Button>
              <Button color="inherit" onClick={() => navigate('/health')}>
                Health
              </Button>
              <Button color="inherit" onClick={() => navigate('/shopping')}>
                Shopping
              </Button>
              <Button color="inherit" onClick={() => navigate('/scanner')}>
                Scanner
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout; 