import { loginUser, registerUser } from '@/services/User/Auth/index';

export async function handleLogin(form: { email: string; password: string }) {
  if (!form.email || !form.password) {
    return { error: 'Vui lòng nhập đầy đủ thông tin!' };
  }
  try {
    const response = await loginUser(form);
    if (response.data && response.data.data && response.data.data) {
      localStorage.setItem('userToken', JSON.stringify(response.data.data));
    }
    return { success: 'Đăng nhập thành công!' };
  } catch (err: any) { 
    return { error: err?.message || 'Đăng nhập thất bại!' };
  }
}

export async function handleRegister(form: { email: string; password: string; name: string; phone: string }) {
  if (!form.email || !form.password || !form.name || !form.phone) {
    return { error: 'Vui lòng nhập đầy đủ thông tin!' };
  }
  try {
    await registerUser(form);
    return { success: 'Đăng ký thành công!' };
  } catch (err: any) {
    return { error: err?.message || 'Đăng ký thất bại!' };
  }
}
