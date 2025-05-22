import React, { useState } from 'react';
import { useHistory } from 'umi';
import { loginUser } from '@/services/User';

const Login: React.FC = () => {
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    setError('');
    
    try {
      await loginUser(form);
      alert('Đăng nhập thành công!');
      history.push('/');
    } catch (err: any) {
      setError(err?.message || 'Đăng nhập thất bại!');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} style={{ width: '100%', padding: 8 }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Mật khẩu</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} style={{ width: '100%', padding: 8 }} required />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: '100%', padding: 10, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 600 }}>Đăng nhập</button>
      </form>
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        Chưa có tài khoản? <a href="/User/Register">Đăng ký</a>
      </div>
    </div>
  );
};

export default Login; 