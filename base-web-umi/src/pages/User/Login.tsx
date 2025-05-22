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
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      setSuccess('');
      return;
    }
    setError('');
    try {
      await loginUser(form);
      setSuccess('Đăng nhập thành công!');
      setTimeout(() => history.push('/'), 1200);
    } catch (err: any) {
      setError(err?.message || 'Đăng nhập thất bại!');
      setSuccess('');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 420, width: '100%', background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', padding: 32 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 28, fontWeight: 700, fontSize: 28, color: '#2563eb' }}>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600, color: '#333' }}>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} style={{ width: '100%', padding: 12, border: '1px solid #dbeafe', borderRadius: 8, fontSize: 16, marginTop: 6, background: '#f8fafc' }} required />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600, color: '#333' }}>Mật khẩu</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} style={{ width: '100%', padding: 12, border: '1px solid #dbeafe', borderRadius: 8, fontSize: 16, marginTop: 6, background: '#f8fafc' }} required />
          </div>
          {error && <div style={{ color: '#ef4444', background: '#fee2e2', borderRadius: 8, padding: '10px 0', textAlign: 'center', marginBottom: 14, fontWeight: 600 }}>{error}</div>}
          {success && <div style={{ color: '#22c55e', background: '#dcfce7', borderRadius: 8, padding: '10px 0', textAlign: 'center', marginBottom: 14, fontWeight: 600 }}>{success}</div>}
          <button type="submit" style={{ width: '100%', padding: 14, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 18, marginTop: 8, boxShadow: '0 2px 8px #dbeafe', transition: 'background 0.2s' }}>Đăng nhập</button>
        </form>
        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 15 }}>
          Chưa có tài khoản? <a href="/User/Register" style={{ color: '#2563eb', fontWeight: 600 }}>Đăng ký</a>
        </div>
      </div>
    </div>
  );
};

export default Login; 