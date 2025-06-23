import axios from '@/utils/axios';

// BASE URL cho user auth
const USER_AUTH_BASE_URL = 'http://localhost:3456/users/auth';

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface GoogleLoginData {
  id_token: string;
}

// Đăng ký user
export async function registerUser(data: RegisterData) {
  const response = await axios.post(`${USER_AUTH_BASE_URL}/register`, data);
  return response.data;
}

// Đăng nhập user
export async function loginUser(data: LoginData) {
  const response = await axios.post(`${USER_AUTH_BASE_URL}/login`, data);
  return response.data;
}

// Đăng xuất user
export async function logoutUser(data: LoginData) {
  const response = await axios.post(`${USER_AUTH_BASE_URL}/logout`, data);
  return response.data;
}

// Đăng nhập với Google
export async function loginWithGoogle(data: GoogleLoginData) {
  const response = await axios.post(`${USER_AUTH_BASE_URL}/login/google`, data);
  return response.data;
}
