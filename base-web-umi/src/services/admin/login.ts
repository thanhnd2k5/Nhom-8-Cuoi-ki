// api.ts
const BASE_URL = 'http://localhost:3456';

interface LoginParams {
  phone: string;
  password: string;
}

interface LoginResponse {
  token: string;
  [key: string]: any;
}

export async function loginApi(data: LoginParams): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorData: any = {};
    try {
      errorData = await response.json();
    } catch {}
    throw new Error(errorData?.message || 'Đăng nhập thất bại');
  }

  return response.json() as Promise<LoginResponse>;
}

export const request = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(BASE_URL + url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData: any = {};
    try {
      errorData = await response.json();
    } catch {}
    throw new Error(errorData?.message || 'Lỗi khi gọi API');
  }

  return response.json();
};
