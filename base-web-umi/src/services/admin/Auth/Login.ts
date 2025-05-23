// api.ts

interface LoginParams {
    phone: string;
    password: string;
  }
  
  interface LoginResponse {
    token: string;
    [key: string]: any; // phòng trường hợp API trả thêm dữ liệu
  }
  
  export async function loginApi(data: { phone: string; password: string }): Promise<any> {
    const response = await fetch('http://localhost:3456/admin/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || 'Đăng nhập thất bại');
    }
  
    return response.json();
  }