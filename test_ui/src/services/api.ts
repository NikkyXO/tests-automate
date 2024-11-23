import axios from 'axios';
import { User } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
});


interface LoginResponse {
  accessToken: string;
  user: User;
}

interface RegisterData {
  username: string;
  password: string;
}


export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', {
      username,
      password,
    });
    localStorage.setItem('access_token', response.data.accessToken);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const registerUser = async (data: RegisterData): Promise<User> => {
  try {
    const response = await api.post<User>('/auth/signup', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const fetchItems = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('no token found, please login first');
    }
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    const response = await api.get('/items', { headers });
    return response.data;
  };
  
  export const createItem = async (itemData: { name: string; description: string }) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('no token found, please login first');
    }
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await api.post('/items', itemData, { headers });
    return response.data;
  };

  export const updateItem = async (itemId: string, itemData: { name: string; description: string }) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('no token found, please login first');
    }
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await api.patch(`/items/${itemId}`, itemData, { headers });
    return response.data;
  };

  export const deleteItem = async (itemId: string) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('no token found, please login first');
    }
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await api.delete(`/items/${itemId}`, { headers });
    return response.data;
  };
  
