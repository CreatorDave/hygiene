import axios from 'axios';
import { User, Profile, ShoppingList, Family, HealthIssue } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

export const userService = {
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/users/me');
    return response.data;
  },
  updateUser: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put('/users/me', userData);
    return response.data;
  },
};

export const profileService = {
  createProfile: async (profileData: Omit<Profile, 'id'>): Promise<Profile> => {
    const response = await api.post('/profiles', profileData);
    return response.data;
  },
  updateProfile: async (id: string, profileData: Partial<Profile>): Promise<Profile> => {
    const response = await api.put(`/profiles/${id}`, profileData);
    return response.data;
  },
  deleteProfile: async (id: string): Promise<void> => {
    await api.delete(`/profiles/${id}`);
  },
};

export const shoppingListService = {
  createList: async (listData: Omit<ShoppingList, 'id'>): Promise<ShoppingList> => {
    const response = await api.post('/shopping-lists', listData);
    return response.data;
  },
  updateList: async (id: string, listData: Partial<ShoppingList>): Promise<ShoppingList> => {
    const response = await api.put(`/shopping-lists/${id}`, listData);
    return response.data;
  },
  deleteList: async (id: string): Promise<void> => {
    await api.delete(`/shopping-lists/${id}`);
  },
};

export const familyService = {
  createFamily: async (familyData: Omit<Family, 'id'>): Promise<Family> => {
    const response = await api.post('/families', familyData);
    return response.data;
  },
  updateFamily: async (id: string, familyData: Partial<Family>): Promise<Family> => {
    const response = await api.put(`/families/${id}`, familyData);
    return response.data;
  },
  deleteFamily: async (id: string): Promise<void> => {
    await api.delete(`/families/${id}`);
  },
};

export const healthService = {
  getHealthIssues: async (): Promise<HealthIssue[]> => {
    const response = await api.get('/health-issues');
    return response.data;
  },
  getSuggestions: async (profileId: string): Promise<HealthIssue[]> => {
    const response = await api.get(`/health-issues/suggestions/${profileId}`);
    return response.data;
  },
};

export default api; 