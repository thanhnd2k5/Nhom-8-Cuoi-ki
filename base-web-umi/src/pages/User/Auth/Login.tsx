import React, { useState, useEffect } from 'react';
import { useHistory } from 'umi';
import { handleLogin } from '@/models/User/auth';
import { Divider } from 'antd';
import GoogleLoginButton from '@/components/Google/GoogleLoginButton';


const Login: React.FC = () => {
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      history.replace('/User/Dashboard');
    }
  }, [history]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    console.log(form);
    const result = await handleLogin(form);
    if (result.error) setError(result.error);
    if (result.success) {
      setSuccess(result.success);
      setTimeout(() => history.push('/User/Dashboard'), 1200);
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
          <button onClick={handleSubmit} style={{ width: '100%', padding: 14, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 18, marginTop: 8, boxShadow: '0 2px 8px #dbeafe', transition: 'background 0.2s' }}>Đăng nhập</button>
        </form>
        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 15 }}>
          Chưa có tài khoản? <a href="/User/Register" style={{ color: '#2563eb', fontWeight: 600 }}>Đăng ký</a>
        </div>
        <Divider>HOẶC TIẾP TỤC VỚI</Divider>
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default Login; 