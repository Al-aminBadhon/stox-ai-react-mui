import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('🔄 Making API Request:', {
      url: config.url,
      method: config.method,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('💥 API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse {
  success: boolean;
  msg: string;
  token?: string;
  user?: any;
}

export const authService = {
  async login(loginData: LoginData): Promise<ApiResponse> {
    try {
      const response = await api.post<ApiResponse>('/login', loginData);
      return response.data;
    } catch (error: any) {
      // Axios wraps errors, so we need to extract the response data
      if (error.response?.data) {
        throw error.response.data;
      }
      throw {
        success: false,
        msg: error.message || 'Network error occurred'
      };
    }
  },

  async register(registerData: RegisterData): Promise<ApiResponse> {
    try {
      const response = await api.post<ApiResponse>('/register', registerData);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw {
        success: false,
        msg: error.message || 'Network error occurred'
      };
    }
  },

  async getProfile(token: string): Promise<ApiResponse> {
    try {
      const response = await api.get<ApiResponse>('/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw {
        success: false,
        msg: error.message || 'Network error occurred'
      };
    }
  },

  // Helper method to set auth token for future requests
  setAuthToken(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  // Helper method to remove auth token
  removeAuthToken() {
    delete api.defaults.headers.common['Authorization'];
  }
};