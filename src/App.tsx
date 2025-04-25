import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './context/AuthContext';
import theme from './theme';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import HealthTracker from './components/HealthTracker';
import ShoppingList from './components/ShoppingList';
import ScannerScreen from './components/ScannerScreen';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/health-tracker"
        element={
          <PrivateRoute>
            <HealthTracker />
          </PrivateRoute>
        }
      />
      <Route
        path="/shopping-list"
        element={
          <PrivateRoute>
            <ShoppingList />
          </PrivateRoute>
        }
      />
      <Route
        path="/scanner"
        element={
          <PrivateRoute>
            <ScannerScreen />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App; 