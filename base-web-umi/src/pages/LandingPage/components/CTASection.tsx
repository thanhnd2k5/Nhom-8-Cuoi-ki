import React from 'react';
import styles from '../LandingPage.less';

const CTASection: React.FC = () => {
  return (
    <section style={{ padding: '40px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ borderRadius: 24, background: 'linear-gradient(90deg,#2563eb,#6366f1)', padding: '48px 24px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 36, fontWeight: 700 }}>Bắt đầu hành trình học tập của bạn</h2>
          <p style={{ marginTop: 16, fontSize: 18, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            Đăng ký tư vấn tuyển sinh ngay hôm nay để được tư vấn chi tiết về chương trình đào tạo và cơ hội phát triển tại trường
          </p>
          <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            <button style={{ background: '#fff', color: '#2563eb', border: 'none', borderRadius: 8, padding: '14px 40px', fontSize: 18, fontWeight: 700, cursor: 'pointer' }}>
              Đăng ký tư vấn
            </button>
            <button style={{ background: 'transparent', color: '#fff', border: '2px solid #fff', borderRadius: 8, padding: '14px 40px', fontSize: 18, fontWeight: 700, cursor: 'pointer' }}>
              Tham quan trường
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 