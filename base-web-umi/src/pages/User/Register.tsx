import React, { useState } from 'react';
import { useHistory } from 'umi';
import { registerUser } from '@/services/User';

const Register: React.FC = () => {
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.name || !form.phone) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    setError('');
    console.log(form);
    try {
      await registerUser(form);
      alert('Đăng ký thành công!');
      history.push('/User/Login');
    } catch (err: any) {
      setError(err?.message || 'Đăng ký thất bại!');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} style={{ width: '100%', padding: 8 }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Mật khẩu</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} style={{ width: '100%', padding: 8 }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Họ tên</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} style={{ width: '100%', padding: 8 }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Số điện thoại</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} style={{ width: '100%', padding: 8 }} required />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button type="submit" onClick={handleSubmit} style={{ width: '100%', padding: 10, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }}>Đăng ký</button>
      </form>
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        Đã có tài khoản? <a href="/User/Login">Đăng nhập</a>
      </div>
    </div>
  );
};

export default Register; 