import api from './api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}

const authService = {
  login: async (data: LoginPayload) => {
    const response = await api.post('/auth/login', data);
    return response.data.data;
  },

  register: async (data: RegisterPayload) => {
    const response = await api.post('/auth/register', data);
    return response.data.data;
  },
};

export default authService;
