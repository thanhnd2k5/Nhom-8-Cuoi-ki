import request from '@/utils/axios';

// Hàm đăng ký user
export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
  phone: string;
}) {
  return request('http://localhost:3456/users/auth/register', {
    method: 'POST',
    data,
  });
}

// Hàm đăng nhập user
export async function loginUser(data: {
  email: string;
  password: string;
}) {
  return request('http://localhost:3456/users/auth/login', {
    method: 'POST',
    data,
  });
} 