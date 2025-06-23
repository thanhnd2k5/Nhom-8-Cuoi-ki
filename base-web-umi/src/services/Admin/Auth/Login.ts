import axios from '@/utils/axios';

interface LoginParams {
  phone: string;
  password: string;
}

interface LoginResponse {
  token: string;
  [key: string]: any; // để mở rộng thêm thông tin khác nếu API trả về
}

// ✅ Tách base URL
const AUTH_BASE_URL = 'http://localhost:3456/admin/auth';

// ✅ Hàm đăng nhập admin
export async function loginApi(data: LoginParams): Promise<LoginResponse> {
  const response = await axios.post(`${AUTH_BASE_URL}/login`, data);
  return response.data;
}

// ✅ Hàm đăng xuất admin
export async function logoutAdmin(): Promise<void> {
  await axios.post(`${AUTH_BASE_URL}/logout`);
}
